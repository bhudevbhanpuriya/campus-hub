import EventsClient from "@/components/events.client"

export default async function EventsPage() {
  const res = await fetch("http://localhost:3000/api/events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
  if (!res.ok) {
    throw new Error("Failed to fetch events")
  }
  const response = await res.json();
  const events = response.data || [];
  return <EventsClient events={events} />
}