import EventsClient from "./events-client";
import { api } from "@/lib/api";

export default async function EventsPage() {
  const events = await api.get("/events");

  return <EventsClient events={events} />;
}
