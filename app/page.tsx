import Explorebtn from "@/components/Explorebtn";
import EventCard from "@/components/EventCard";
import { events } from "@/lib/constants";

const Page = () => {
    return (
        <section>
            <h1 className="text-center">The Hub For Every Dev <br/>The Event You Can&apos;t Miss</h1>
            <p className="text-center mt-5">Hackathons, Meetups and conferences, All in one place</p>

            <Explorebtn/>

            <div className="mt-20 space-y-7"  id="events">
                <h3>Featured Events</h3>
                <ul className="events">
                    {events.map((event) => (
                        <li className="list-none" key={event.title}>
                            <EventCard {...event} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
export default Page
