import { HydratedDocument, Model, Schema, Types, model, models } from "mongoose"
import { Event } from "./event.model"

export interface BookingAttrs {
  eventId: Types.ObjectId
  email: string
  createdAt?: Date
  updatedAt?: Date
}

type BookingDocument = HydratedDocument<BookingAttrs>
type BookingModel = Model<BookingAttrs>

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const bookingSchema = new Schema<BookingAttrs, BookingModel>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
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

bookingSchema.index({ eventId: 1 })

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

export const Booking =
  (models.Booking as BookingModel) || model<BookingAttrs>("Booking", bookingSchema)
