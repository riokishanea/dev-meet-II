import { HydratedDocument, Model, Schema, Types, model, models } from "mongoose"
import { Event } from "./event.model"

// This interface describes the data a booking must contain.
// Each booking connects one email address to one event.
export interface BookingAttrs {
  eventId: Types.ObjectId
  email: string
  createdAt?: Date
  updatedAt?: Date
}

// Runtime booking document type, including Mongoose document methods.
type BookingDocument = HydratedDocument<BookingAttrs>

// Type for the Booking model itself.
type BookingModel = Model<BookingAttrs>

// Simple email pattern used by both schema validation and the save hook.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// The booking schema defines the fields stored in MongoDB and their basic validation rules.
const bookingSchema = new Schema<BookingAttrs, BookingModel>(
  {
    eventId: {
      // Store the id of the related Event document.
      type: Schema.Types.ObjectId,
      // `ref` tells Mongoose which model this ObjectId points to.
      ref: "Event",
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [EMAIL_REGEX, "email must be a valid email address."],
    },
  },
  { timestamps: true }
)

// Add an index so MongoDB can quickly find all bookings for a given event.
bookingSchema.index({ eventId: 1 })

// Before saving, clean the email and make sure the booking points to a real event.
bookingSchema.pre("save", async function (this: BookingDocument) {
  // Normalize and validate email consistently before persisting.
  this.email = this.email.trim().toLowerCase()
  if (!EMAIL_REGEX.test(this.email)) {
    throw new Error("email must be a valid email address.")
  }

  // Guard referential integrity by ensuring the linked event exists.
  if (this.isNew || this.isModified("eventId")) {
    const eventExists = await Event.exists({ _id: this.eventId })
    if (!eventExists) {
      throw new Error("Referenced event does not exist.")
    }
  }
})

// Reuse the already-created Booking model when available.
// This avoids errors when files are reloaded in development.
export const Booking =
  (models.Booking as BookingModel) || model<BookingAttrs>("Booking", bookingSchema)
