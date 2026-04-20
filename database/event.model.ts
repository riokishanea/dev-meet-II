import { HydratedDocument, Model, Schema, model, models } from "mongoose"

export interface EventAttrs {
  title: string
  slug?: string
  description: string
  overview: string
  image: string
  venue: string
  location: string
  date: string
  time: string
  mode: string
  audience: string
  agenda: string[]
  organizer: string
  tags: string[]
  createdAt?: Date
  updatedAt?: Date
}

type EventDocument = HydratedDocument<EventAttrs>
type EventModel = Model<EventAttrs>

const eventSchema = new Schema<EventAttrs, EventModel>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    overview: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    venue: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    mode: { type: String, required: true, trim: true },
    audience: { type: String, required: true, trim: true },
    agenda: { type: [String], required: true },
    organizer: { type: String, required: true, trim: true },
    tags: { type: [String], required: true },
  },
  { timestamps: true }
)

eventSchema.index({ slug: 1 }, { unique: true })

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")

const ensureNonEmpty = (fieldName: string, value: string): string => {
  const normalized = value.trim()
  if (!normalized) {
    throw new Error(`${fieldName} is required and cannot be empty.`)
  }
  return normalized
}

const ensureStringArray = (fieldName: string, value: string[]): string[] => {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${fieldName} must contain at least one item.`)
  }

  return value.map((item) => {
    const normalized = item.trim()
    if (!normalized) {
      throw new Error(`${fieldName} cannot contain empty values.`)
    }
    return normalized
  })
}

const normalizeDateToIso = (value: string): string => {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    throw new Error("date must be a valid date string.")
  }
  return parsed.toISOString()
}

const normalizeTime = (value: string): string => {
  const input = value.trim()

  const twentyFourHourMatch = input.match(/^([01]?\d|2[0-3]):([0-5]\d)$/)
  if (twentyFourHourMatch) {
    const hours = twentyFourHourMatch[1].padStart(2, "0")
    const minutes = twentyFourHourMatch[2]
    return `${hours}:${minutes}`
  }

  const twelveHourMatch = input.match(
    /^(0?[1-9]|1[0-2]):([0-5]\d)\s?(AM|PM)$/i
  )
  if (twelveHourMatch) {
    let hours = Number.parseInt(twelveHourMatch[1], 10)
    const minutes = twelveHourMatch[2]
    const meridiem = twelveHourMatch[3].toUpperCase()

    if (meridiem === "PM" && hours < 12) {
      hours += 12
    }
    if (meridiem === "AM" && hours === 12) {
      hours = 0
    }

    return `${hours.toString().padStart(2, "0")}:${minutes}`
  }

  throw new Error("time must be in HH:mm or h:mm AM/PM format.")
}

eventSchema.pre("validate", function (this: EventDocument) {
  // Generate slug before validation so `slug` can remain required at schema level.
  this.title = ensureNonEmpty("title", this.title)
  if (this.isModified("title") || !this.slug) {
    const generatedSlug = slugify(this.title)
    if (!generatedSlug) {
      throw new Error("Unable to generate a slug from title.")
    }
    this.slug = generatedSlug
  }
})

eventSchema.pre("save", function (this: EventDocument) {
  // Validate and normalize required text fields before persistence.
  this.title = ensureNonEmpty("title", this.title)
  this.description = ensureNonEmpty("description", this.description)
  this.overview = ensureNonEmpty("overview", this.overview)
  this.image = ensureNonEmpty("image", this.image)
  this.venue = ensureNonEmpty("venue", this.venue)
  this.location = ensureNonEmpty("location", this.location)
  this.mode = ensureNonEmpty("mode", this.mode)
  this.audience = ensureNonEmpty("audience", this.audience)
  this.organizer = ensureNonEmpty("organizer", this.organizer)

  // Normalize agenda/tags and reject empty entries.
  this.agenda = ensureStringArray("agenda", this.agenda)
  this.tags = ensureStringArray("tags", this.tags)

  // Keep date/time in consistent storage formats.
  this.date = normalizeDateToIso(ensureNonEmpty("date", this.date))
  this.time = normalizeTime(ensureNonEmpty("time", this.time))

})

export const Event = (models.Event as EventModel) || model<EventAttrs>("Event", eventSchema)
