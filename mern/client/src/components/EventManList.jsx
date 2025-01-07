import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const baseUrl = import.meta.env.VITE_BASE_URL;
console.log(baseUrl);
// Event List Component
export function EventList() {
  const [events, setEvents] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const {t} = useTranslation();

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch(`${baseUrl}/events`);
      const events = await response.json();
      setEvents(events);
    }
    fetchEvents();
  }, []);

  async function deleteEvent(id) {
    await fetch(`${baseUrl}/events/${id}`, {
      method: "DELETE",
    });
    setEvents(events.filter(event => event._id !== id));
  }

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h3 className="text-lg font-semibold">{t("events_title")}</h3>
        <Link
          to="/events/create"
          className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
        >
          {t("events_description")}
        </Link>
      </div>

      {/* Desktop View */}

      <div className="hidden md:block border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              {t("events_table.name")}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              {t("events_table.date")}</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              {t("events_table.location")}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              {t("events_table.status")}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              {t("events_table.actions_label")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event._id}>
                <td className="px-4 py-3">{event.name || 'No Name Specified'}</td>
                <td className="px-6 py-4 ">{new Date(event.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 ">{event.location?.[0]?.name || 'N/A'}</td>
                <td className="px-6 py-4 ">{event.status|| 'N/A'}</td>
                <td className="px-6 py-4 ">
                  <div className="flex gap-2">
                    <Link
                      to={`/events/edit/${event._id}`}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                    >
                      {t("events_table.actions.edit")}
                    </Link>
                    <button
                      onClick={() => deleteEvent(event._id)}
                      className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                    >
                      {t("events_table.actions.delete")}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-lg border shadow-sm overflow-hidden"
          >
            <div
              className="p-4 cursor-pointer"
              onClick={() => setExpandedRow(expandedRow === event._id ? null : event._id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{event.name || 'No Name Specified'}</p>
                  <p className="text-sm text-gray-600">{event.location?.[0]?.name || 'Unknown Location'}</p>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${expandedRow === event._id ? 'rotate-180' : ''
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
                </div>
                </div>
                
                {expandedRow === event._id && (
                  <div className="px-4 pb-4 space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">{t("events_table.date")}</p>
                        <p>{new Date(event.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">{t("events_table.location")}</p>
                        <p>{event.location?.[0]?.name || 'N/A'}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-500">{t("events_table.status")}</p>
                        <p>{event.status || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Link
                        to={`/events/edit/${event._id}`}
                        className="flex-1 px-3 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-center"
                      >
                        {t("events_table.actions.edit")}
                      </Link>
                      <button
                        onClick={() => deleteEvent(event._id)}
                        className="flex-1 px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 text-center"
                      >
                        {t("events_table.actions.delete")}
                      </button>
                    </div>
                  </div>
                )}

            </div>

        ))}
    </div>
    </div>
  );
}

// Movement List Component
export function MovementList() {
  const [movements, setMovements] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const {t} = useTranslation();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  useEffect(() => {
    async function fetchMovements() {
      const response = await fetch(`${baseUrl}/movements`);
      const movements = await response.json();
      setMovements(movements);
    }
    fetchMovements();
  }, []);

  async function deleteMovement(id) {
    await fetch(`${baseUrl}/movements/${id}`, {
      method: "DELETE",
    });
    setMovements(movements.filter(movement => movement._id !== id));
  }

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h3 className="text-lg font-semibold">{t("transtransport_title")}</h3>
        <Link
          to="/movements/create"
          className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
        >
          {t("transport_description")}
        </Link>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("transport_table.performer")}</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("transport_table.driver")}</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("transport_table.vehicle")}</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("transport_table.fromto")}</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("transport_table.time")}</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("transport_table.actions_label")}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {movements.map((movement) => (
              <tr key={movement._id}>
                <td className="px-4 py-3">{movement.performer?.[0]?.name || 'N/A'}</td>
                <td className="px-4 py-3">{movement.driver?.[0]?.name || 'N/A'}</td>
                <td className="px-4 py-3">{movement.vehicle?.[0]?.plate || 'N/A'}</td>
                <td className="px-4 py-3">{movement.departureLocation} → {movement.destination}</td>
                <td className="px-4 py-3">{formatDate(movement.scheduledTime)}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      to={`/movements/edit/${movement._id}`}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                    >
                      {t("transport_table.actions.edit")}
                    </Link>
                    <button
                      onClick={() => deleteMovement(movement._id)}
                      className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                    >
                      {t("transport_table.actions.delete")}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {movements.map((movement) => (
          <div
            key={movement._id}
            className="bg-white rounded-lg border shadow-sm overflow-hidden"
          >
            <div
              className="p-4 cursor-pointer"
              onClick={() => setExpandedRow(expandedRow === movement._id ? null : movement._id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{movement.performer?.[0]?.name || 'N/A'}</p>
                  <p className="text-sm text-gray-600">
                    {movement.departureLocation} → {movement.destination}
                  </p>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${expandedRow === movement._id ? 'rotate-180' : ''
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {expandedRow === movement._id && (
              <div className="px-4 pb-4 space-y-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Driver</p>
                    <p>{movement.driver?.[0]?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Vehicle</p>
                    <p>{movement.vehicle?.[0]?.plate || 'N/A'}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Time</p>
                    <p>{formatDate(movement.scheduledTime)}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Link
                    to={`/movements/edit/${movement._id}`}
                    className="flex-1 px-3 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-center"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteMovement(movement._id)}
                    className="flex-1 px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Performer List Component
export function PerformerList() {
  const [performers, setPerformers] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const {t} = useTranslation();

  useEffect(() => {
    async function fetchPerformers() {
      const response = await fetch(`${baseUrl}/performers`);
      const performers = await response.json();
      setPerformers(performers);
    }
    fetchPerformers();
  }, []);

  async function deletePerformer(id) {
    await fetch(`${baseUrl}/performers/${id}`, {
      method: "DELETE",
    });
    setPerformers(performers.filter(performer => performer._id !== id));
  }

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h3 className="text-lg font-semibold">{t("performers_title")}</h3>
        <Link
          to="/performers/create"
          className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
        >
          {t("performers_description")}
        </Link>
      </div>
  
      {/* Desktop View */}
      <div className="hidden md:block border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("performers_table.name")}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("performers_table.hotel")}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("performers_table.requirements")}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("performers_table.actions_label")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {performers.map((performer) => (
              <tr key={performer._id}>
                <td className="px-4 py-3">{performer.name}</td>
                <td className="px-6 py-4">{performer.accommodation?.[0]?.name || 'Not Assigned'}</td>
                <td className="px-6 py-4">{performer.requirements}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      to={`/performers/edit/${performer._id}`}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                    >
                      {t("performers_table.actions.edit")}
                    </Link>
                    <button
                      onClick={() => deletePerformer(performer._id)}
                      className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                    >
                   {t("performers_table.actions.delete")}
                   </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {performers.map((performer) => (
          <div key={performer._id} className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div
              className="p-4 cursor-pointer"
              onClick={() => setExpandedRow(expandedRow === performer._id ? null : performer._id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{performer.name}</p>
                  <p className="text-sm text-gray-600">{performer.accommodation?.[0]?.name || 'Unknown Hotel'}</p>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${expandedRow === performer._id ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {expandedRow === performer._id && (
              <div className="px-4 pb-4 space-y-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Hotel</p>
                    <p>{performer.accommodation?.[0]?.name || 'Not Assigned'}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Requirements</p>
                    <p>{performer.requirements}</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Link
                    to={`/performers/edit/${performer._id}`}
                    className="flex-1 px-3 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-center"
                  >
                   {t("performers_table.actions.edit")}

                  </Link>
                  <button
                    onClick={() => deletePerformer(performer._id)}
                    className="flex-1 px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 text-center"
                  >
                   {t("performers_table.actions.delete")}

                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
  
}

export function DriverList() {
  const [drivers, setDrivers] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const {t} = useTranslation();

  useEffect(() => {
    async function fetchDrivers() {
      const response = await fetch(`${baseUrl}/drivers`);
      const drivers = await response.json();
      setDrivers(drivers);
    }
    fetchDrivers();
  }, []);

  async function deleteDriver(id) {
    await fetch(`${baseUrl}/drivers/${id}`, {
      method: "DELETE",
    });
    setEvents(events.filter(event => event._id !== id));
  }
  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h3 className="text-lg font-semibold">{t("drivers_title")}</h3>
        <Link
          to="/drivers/create"
          className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
        >
          {t("drivers_description")}
        </Link>
      </div>
  
      {/* Desktop View */}
      <div className="hidden md:block border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("drivers_table.name")}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("drivers_table.license")}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("drivers_table.ass_vehicle")}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("drivers_table.status")}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("drivers_table.actions_label")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {drivers.map((driver) => (
              <tr key={driver._id}>
                <td className="px-4 py-3">{driver.name}</td>
                <td className="px-6 py-4">{driver.license}</td>
                <td className="px-6 py-4">
                  {driver.assignedVehicleId && <span>- Plate: {driver.assignedVehicleId.plate}</span>}
                </td>
                <td className="px-6 py-4">{driver.status}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      to={`/drivers/edit/${driver._id}`}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteDriver(driver._id)}
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
  
      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {drivers.map((driver) => (
          <div key={driver._id} className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div
              className="p-4 cursor-pointer"
              onClick={() => setExpandedRow(expandedRow === driver._id ? null : driver._id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{driver.name}</p>
                  <p className="text-sm text-gray-600">{driver.assignedVehicleId?.plate || 'Unknown Vehicle'}</p>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${expandedRow === driver._id ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {expandedRow === driver._id && (
              <div className="px-4 pb-4 space-y-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">License</p>
                    <p>{driver.license}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Status</p>
                    <p>{driver.status}</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Link
                    to={`/drivers/edit/${driver._id}`}
                    className="flex-1 px-3 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-center"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteDriver(driver._id)}
                    className="flex-1 px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 text-center"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
  
}

export function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const {t} = useTranslation();

  useEffect(() => {
    async function fetchVehicles() {
      const response = await fetch(`${baseUrl}/vehicles`);
      const vehicles = await response.json();
      setVehicles(vehicles);
    }
    fetchVehicles();
  }, []);

  async function deleteVehicle(id) {
    await fetch(`${baseUrl}/vehicles/${id}`, {
      method: "DELETE",
    });
    setVehicles(vehicles.filter(vehicle => vehicle._id !== id));
  }

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h3 className="text-lg font-semibold">{t("vehicles_title")}</h3>
        <Link
          to="/vehicles/create"
          className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
        >
          {t("vehicles_description")}
        </Link>
      </div>
  
      {/* Desktop View */}
      <div className="hidden md:block border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("vehicles_table.model")}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("vehicles_table.license")}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("vehicles_table.capacity")}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("vehicles_table.status")}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("vehicles_table.actions_label")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vehicles.map((vehicle) => (
              <tr key={vehicle._id}>
                <td className="px-4 py-3">{vehicle.model}</td>
                <td className="px-6 py-4">{vehicle.plate}</td>
                <td className="px-6 py-4">{vehicle.capacity}</td>
                <td className="px-6 py-4">{vehicle.healthReport.status}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      to={`/vehicles/edit/${vehicle._id}`}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteVehicle(vehicle._id)}
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
  
      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {vehicles.map((vehicle) => (
          <div key={vehicle._id} className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div
              className="p-4 cursor-pointer"
              onClick={() => setExpandedRow(expandedRow === vehicle._id ? null : vehicle._id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{vehicle.model}</p>
                  <p className="text-sm text-gray-600">{vehicle.plate}</p>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${expandedRow === vehicle._id ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {expandedRow === vehicle._id && (
              <div className="px-4 pb-4 space-y-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Model</p>
                    <p>{vehicle.model}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Plate</p>
                    <p>{vehicle.plate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Capacity</p>
                    <p>{vehicle.capacity}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Status</p>
                    <p>{vehicle.healthReport.status}</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Link
                    to={`/vehicles/edit/${vehicle._id}`}
                    className="flex-1 px-3 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-center"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteVehicle(vehicle._id)}
                    className="flex-1 px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 text-center"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
  
}

export function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const {t} = useTranslation();

  useEffect(() => {
    async function fetchHotels() {
      const response = await fetch(`${baseUrl}/hotels`);
      const hotels = await response.json();
      setHotels(hotels);
    }
    fetchHotels();
  }, []);

  async function deleteHotel(id) {
    await fetch(`${baseUrl}/hotels/${id}`, {
      method: "DELETE",
    });
    setHotels(hotels.filter(hotel => hotel._id !== id));
  }

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h3 className="text-lg font-semibold">{t("hotels_title")}</h3>
        <Link
          to="/hotels/create"
          className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
        >
          {t("hotels_description")}
        </Link>
      </div>
  
      {/* Desktop View */}
      <div className="hidden md:block border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("hotels_table.name")}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("hotels_table.address")}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("hotels_table.contact_person")}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("hotels_table.phone")}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("hotels_table.email")}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("hotels_table.actions_label")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {hotels.map((hotel) => (
              <tr key={hotel._id}>
                <td className="px-4 py-3">{hotel.name}</td>
                <td className="px-6 py-4">{hotel.address}</td>
                <td className="px-6 py-4">{hotel.contactInfo?.contactPerson}</td>
                <td className="px-6 py-4">{hotel.contactInfo?.phone}</td>
                <td className="px-6 py-4">{hotel.contactInfo?.email}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      to={`/hotels/edit/${hotel._id}`}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteHotel(hotel._id)}
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
  
      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {hotels.map((hotel) => (
          <div key={hotel._id} className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div
              className="p-4 cursor-pointer"
              onClick={() => setExpandedRow(expandedRow === hotel._id ? null : hotel._id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{hotel.name}</p>
                  <p className="text-sm text-gray-600">{hotel.address}</p>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${expandedRow === hotel._id ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {expandedRow === hotel._id && (
              <div className="px-4 pb-4 space-y-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Contact Person</p>
                    <p>{hotel.contactInfo?.contactPerson}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p>{hotel.contactInfo?.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Email</p>
                    <p>{hotel.contactInfo?.email}</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Link
                    to={`/hotels/edit/${hotel._id}`}
                    className="flex-1 px-3 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-center"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteHotel(hotel._id)}
                    className="flex-1 px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 text-center"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
  
}
