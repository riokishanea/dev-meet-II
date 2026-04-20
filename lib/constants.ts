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
  {
    title: "React Summit US 2026",
    image: "/images/event7.jpg",
    slug: "react-summit-us-2026",
    place: "New York City, US",
    date: "November 18 2026",
    time: "9:30 AM",
    category: "Conference",
  },
  {
    title: "AWS Community Hackday 2026",
    image: "/images/event8.jpg",
    slug: "aws-community-hackday-2026",
    place: "Seattle, US",
    date: "August 22 2026",
    time: "10:00 AM",
    category: "Hackathon",
  },
  {
    title: "Frontend Nation 2026",
    image: "/images/event9.jpg",
    slug: "frontend-nation-2026",
    place: "Amsterdam, NL",
    date: "June 04 2026",
    time: "11:00 AM",
    category: "Conference",
  },
  {
    title: "Product Engineering Forum 2026",
    image: "/images/event10.jpg",
    slug: "product-engineering-forum-2026",
    place: "Berlin, DE",
    date: "September 16 2026",
    time: "9:00 AM",
    category: "Conference",
  },
  {
    title: "Open Source Maintainers Meetup",
    image: "/images/event11.jpg",
    slug: "open-source-maintainers-meetup",
    place: "London, UK",
    date: "July 24 2026",
    time: "6:30 PM",
    category: "Meetup",
  },
  {
    title: "AI Builders Demo Night",
    image: "/images/event12.jpg",
    slug: "ai-builders-demo-night",
    place: "Toronto, CA",
    date: "October 08 2026",
    time: "7:00 PM",
    category: "Meetup",
  },
];
