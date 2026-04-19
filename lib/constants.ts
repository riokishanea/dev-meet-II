export interface Event {
  title: string;
  image: string;
  slug: string;
  place: string;
  date: string;
  time: string;
  category: "Conference" | "Hackathon" | "Meetup";
}

export const events: Event[] = [
  {
    title: "Google I/O 2026",
    image: "/images/event1.png",
    slug: "google-io-2026",
    place: "Mountain View, US",
    date: "May 19 2026",
    time: "10:00 AM",
    category: "Conference",
  },
  {
    title: "Microsoft Build 2026",
    image: "/images/event2.png",
    slug: "microsoft-build-2026",
    place: "San Francisco, US",
    date: "June 02 2026",
    time: "9:00 AM",
    category: "Conference",
  },
  {
    title: "Apple WWDC26",
    image: "/images/event3.png",
    slug: "apple-wwdc26",
    place: "Cupertino, US",
    date: "June 08 2026",
    time: "10:00 AM",
    category: "Conference",
  },
  {
    title: "GitHub Universe 2026",
    image: "/images/event4.png",
    slug: "github-universe-2026",
    place: "San Francisco, US",
    date: "October 28 2026",
    time: "9:00 AM",
    category: "Conference",
  },
  {
    title: "Web Summit 2026",
    image: "/images/event5.png",
    slug: "web-summit-2026",
    place: "Lisbon, PT",
    date: "November 09 2026",
    time: "9:00 AM",
    category: "Conference",
  },
  {
    title: "ETHGlobal New York 2026",
    image: "/images/event6.png",
    slug: "ethglobal-new-york-2026",
    place: "New York City, US",
    date: "June 12 2026",
    time: "6:00 PM",
    category: "Hackathon",
  },
];
