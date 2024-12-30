import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Event List Component
export function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch("http://localhost:5050/events");
      const events = await response.json();
      setEvents(events);
    }
    fetchEvents();
  }, []);

  async function deleteEvent(id) {
    await fetch(`http://localhost:5050/events/${id}`, {
      method: "DELETE",
    });
    setEvents(events.filter(event => event._id !== id));
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Events</h3>
        <Link
          to="/events/create"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Event
        </Link>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event._id}>
                <td className="px-6 py-4 whitespace-nowrap">{event.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(event.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {event.location?.[0]?.name || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{event.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <Link
                      to={`/events/edit/${event._id}`}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteEvent(event._id)}
                      className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Movement List Component
export function MovementList() {
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    async function fetchMovements() {
      const response = await fetch("http://localhost:5050/movements");
      const movements = await response.json();
      setMovements(movements);
    }
    fetchMovements();
  }, []);

  async function deleteMovement(id) {
    await fetch(`http://localhost:5050/movements/${id}`, {
      method: "DELETE",
    });
    setMovements(movements.filter(movement => movement._id !== id));
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Transportation Schedule</h3>
        <Link
          to="/movements/create"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Schedule Movement
        </Link>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Performer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Driver
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                From/To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {movements.map((movement) => (
              <tr key={movement._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {movement.performer?.[0]?.name || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {movement.driver?.[0]?.name || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {movement.vehicle?.[0]?.plate || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {movement.departureLocation} → {movement.destination}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(movement.scheduledTime).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <Link
                      to={`/movements/edit/${movement._id}`}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteMovement(movement._id)}
                      className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Performer List Component
export function PerformerList() {
  const [performers, setPerformers] = useState([]);

  useEffect(() => {
    async function fetchPerformers() {
      const response = await fetch("http://localhost:5050/performers");
      const performers = await response.json();
      setPerformers(performers);
    }
    fetchPerformers();
  }, []);

  async function deletePerformer(id) {
    await fetch(`http://localhost:5050/performers/${id}`, {
      method: "DELETE",
    });
    setPerformers(performers.filter(performer => performer._id !== id));
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Performers</h3>
        <Link
          to="/performers/create"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Performer
        </Link>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hotel
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Requirements
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {performers.map((performer) => (
              <tr key={performer._id}>
                <td className="px-6 py-4 whitespace-nowrap">{performer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {performer.accommodation?.[0]?.name || 'Not Assigned'}
                </td>
                <td className="px-6 py-4">{performer.requirements}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <Link
                      to={`/performers/edit/${performer._id}`}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deletePerformer(performer._id)}
                      className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}