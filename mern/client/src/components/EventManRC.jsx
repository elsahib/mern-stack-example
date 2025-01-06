import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;
// Event Form Component
export function EventForm() {
  const [form, setForm] = useState({
    name: "",
    date: "",
    performerIds: [],
    locationId: "",
    status: "scheduled"
  });
  const [performers, setPerformers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch performers and locations for dropdown
    async function fetchData() {
      const [performersRes, locationsRes] = await Promise.all([
        fetch(`${baseUrl}/performers`),
        fetch(`${baseUrl}/hotels`)
      ]);
      setPerformers(await performersRes.json());
      setLocations(await locationsRes.json());

      // If editing, fetch event data
      if (params.id) {
        setIsNew(false);
        const eventRes = await fetch(`${baseUrl}/events/${params.id}`);
        const event = await eventRes.json();
        setForm(event);
      }
    }
    fetchData();
  }, [params.id]);

  function updateForm(value) {
    return setForm((prev) => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const event = { ...form };
    try {
      const url = isNew ? `${baseUrl}/events` : `${baseUrl}/events/${params.id}`;
      const method = isNew ? "POST" : "PATCH";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });
      if (!response.ok) throw new Error(response.statusText);
      navigate("/events");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">
        {isNew ? "Create Event" : "Edit Event"}
      </h3>
      <form onSubmit={onSubmit} className="border rounded-lg p-4">
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Event Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={form.name}
              onChange={(e) => updateForm({ name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="datetime-local"
              className="w-full p-2 border rounded"
              value={form.date}
              onChange={(e) => updateForm({ date: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Performers</label>
            <select
              multiple
              className="w-full p-2 border rounded"
              value={form.performerIds}
              onChange={(e) => updateForm({ 
                performerIds: Array.from(e.target.selectedOptions, option => option.value)
              })}
            >
              {performers.map((performer) => (
                <option key={performer._id} value={performer._id}>
                  {performer.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <select
              className="w-full p-2 border rounded"
              value={form.locationId}
              onChange={(e) => updateForm({ locationId: e.target.value })}
            >
              <option value="">Select Location</option>
              {locations.map((location) => (
                <option key={location._id} value={location._id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isNew ? "Create Event" : "Update Event"}
        </button>
      </form>
    </div>
  );
}

// Performer Form Component
export function PerformerForm() {
  const [form, setForm] = useState({
    name: "",
    hotelId: "",
    requirements: ""
  });
  const [hotels, setHotels] = useState([]);
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const hotelsRes = await fetch(`${baseUrl}/hotels`);
      setHotels(await hotelsRes.json());

      if (params.id) {
        setIsNew(false);
        const performerRes = await fetch(`${baseUrl}/performers/${params.id}`);
        const performer = await performerRes.json();
        setForm(performer);
      }
    }
    fetchData();
  }, [params.id]);

  function updateForm(value) {
    return setForm((prev) => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const url = isNew ? `${baseUrl}/performers` : `${baseUrl}/performers/${params.id}`;
      const method = isNew ? "POST" : "PATCH";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error(response.statusText);
      navigate("/performers");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">
        {isNew ? "Create Performer" : "Edit Performer"}
      </h3>
      <form onSubmit={onSubmit} className="border rounded-lg p-4">
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={form.name}
              onChange={(e) => updateForm({ name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Hotel</label>
            <select
              className="w-full p-2 border rounded"
              value={form.hotelId}
              onChange={(e) => updateForm({ hotelId: e.target.value })}
            >
              <option value="">Select Hotel</option>
              {hotels.map((hotel) => (
                <option key={hotel._id} value={hotel._id}>
                  {hotel.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Requirements</label>
            <textarea
              className="w-full p-2 border rounded"
              value={form.requirements}
              onChange={(e) => updateForm({ requirements: e.target.value })}
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isNew ? "Create Performer" : "Update Performer"}
        </button>
      </form>
    </div>
  );
}

// Movement Form Component
export function MovementForm() {
  const [form, setForm] = useState({
    performerId: "",
    driverId: "",
    vehicleId: "",
    departureLocation: "",
    destination: "",
    scheduledTime: "",
    status: "scheduled"
  });
  const [performers, setPerformers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const [performersRes, driversRes, vehiclesRes] = await Promise.all([
        fetch(`${baseUrl}/performers`),
        fetch(`${baseUrl}/drivers`),
        fetch(`${baseUrl}/vehicles`)
      ]);
      setPerformers(await performersRes.json());
      setDrivers(await driversRes.json());
      setVehicles(await vehiclesRes.json());

      if (params.id) {
        setIsNew(false);
        const movementRes = await fetch(`${baseUrl}/movements/${params.id}`);
        const movement = await movementRes.json();
        setForm(movement);
      }
    }
    fetchData();
  }, [params.id]);

  function updateForm(value) {
    return setForm((prev) => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const url = isNew ? `${baseUrl}/movements` : `${baseUrl}/movements/${params.id}`;
      const method = isNew ? "POST" : "PATCH";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error(response.statusText);
      navigate("/movements");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">
        {isNew ? "Schedule Movement" : "Edit Movement"}
      </h3>
      <form onSubmit={onSubmit} className="border rounded-lg p-4">
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Performer</label>
            <select
              className="w-full p-2 border rounded"
              value={form.performerId}
              onChange={(e) => updateForm({ performerId: e.target.value })}
            >
              <option value="">Select Performer</option>
              {performers.map((performer) => (
                <option key={performer._id} value={performer._id}>
                  {performer.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Driver</label>
            <select
              className="w-full p-2 border rounded"
              value={form.driverId}
              onChange={(e) => updateForm({ driverId: e.target.value })}
            >
              <option value="">Select Driver</option>
              {drivers.map((driver) => (
                <option key={driver._id} value={driver._id}>
                  {driver.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Vehicle</label>
            <select
              className="w-full p-2 border rounded"
              value={form.vehicleId}
              onChange={(e) => updateForm({ vehicleId: e.target.value })}
            >
              <option value="">Select Vehicle</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle._id} value={vehicle._id}>
                  {vehicle.model} - {vehicle.plate}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">From</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={form.departureLocation}
                onChange={(e) => updateForm({ departureLocation: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">To</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={form.destination}
                onChange={(e) => updateForm({ destination: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Scheduled Time</label>
            <input
              type="datetime-local"
              className="w-full p-2 border rounded"
              value={form.scheduledTime}
              onChange={(e) => updateForm({ scheduledTime: e.target.value })}
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isNew ? "Schedule Movement" : "Update Movement"}
        </button>
      </form>
    </div>
  );
}

// Driver Form Component
export function DriverForm() {
  const [form, setForm] = useState({
    name: "",
    license: "",
    status: "available",
    assignedVehicleId: ""
  });
  const [vehicles, setVehicles] = useState([]);
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      // Fetch available vehicles for assignment
      const vehiclesRes = await fetch(`${baseUrl}/vehicles`);
      setVehicles(await vehiclesRes.json());

      if (params.id) {
        setIsNew(false);
        const driverRes = await fetch(`${baseUrl}/drivers/${params.id}`);
        const driver = await driverRes.json();
        setForm(driver);
      }
    }
    fetchData();
  }, [params.id]);

  function updateForm(value) {
    return setForm((prev) => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const url = isNew ? `${baseUrl}/drivers` : `${baseUrl}/drivers/${params.id}`;
      const method = isNew ? "POST" : "PATCH";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error(response.statusText);
      navigate("/drivers");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">
        {isNew ? "Add Driver" : "Edit Driver"}
      </h3>
      <form onSubmit={onSubmit} className="border rounded-lg p-4">
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={form.name}
              onChange={(e) => updateForm({ name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">License Number</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={form.license}
              onChange={(e) => updateForm({ license: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              className="w-full p-2 border rounded"
              value={form.status}
              onChange={(e) => updateForm({ status: e.target.value })}
            >
              <option value="available">Available</option>
              <option value="on_duty">On Duty</option>
              <option value="off_duty">Off Duty</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Assigned Vehicle</label>
            <select
              className="w-full p-2 border rounded"
              value={form.assignedVehicleId}
              onChange={(e) => updateForm({ assignedVehicleId: e.target.value })}
            >
              <option value="">No Vehicle Assigned</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle._id} value={vehicle._id}>
                  {vehicle.model} - {vehicle.plate}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isNew ? "Add Driver" : "Update Driver"}
        </button>
      </form>
    </div>
  );
}

// Vehicle Form Component
export function VehicleForm() {
  const [form, setForm] = useState({
    model: "",
    plate: "",
    capacity: "",
    healthReport: {
      lastInspection: "",
      status: "operational",
      issues: []
    }
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (params.id) {
        setIsNew(false);
        const response = await fetch(`${baseUrl}/vehicles/${params.id}`);
        const vehicle = await response.json();
        setForm(vehicle);
      }
    }
    fetchData();
  }, [params.id]);

  function updateForm(value) {
    return setForm((prev) => {
      if (value.healthReport) {
        return {
          ...prev,
          healthReport: { ...prev.healthReport, ...value.healthReport }
        };
      }
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const url = isNew ? `${baseUrl}/vehicles` : `${baseUrl}/vehicles/${params.id}`;
      const method = isNew ? "POST" : "PATCH";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error(response.statusText);
      navigate("/vehicles");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">
        {isNew ? "Add Vehicle" : "Edit Vehicle"}
      </h3>
      <form onSubmit={onSubmit} className="border rounded-lg p-4">
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Model</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={form.model}
              onChange={(e) => updateForm({ model: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">License Plate</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={form.plate}
              onChange={(e) => updateForm({ plate: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Passenger Capacity</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={form.capacity}
              onChange={(e) => updateForm({ capacity: e.target.value })}
            />
          </div>
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Health Report</h4>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Last Inspection</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded"
                  value={form.healthReport.lastInspection}
                  onChange={(e) => updateForm({ 
                    healthReport: { lastInspection: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  className="w-full p-2 border rounded"
                  value={form.healthReport.status}
                  onChange={(e) => updateForm({ 
                    healthReport: { status: e.target.value }
                  })}
                >
                  <option value="operational">Operational</option>
                  <option value="maintenance">Needs Maintenance</option>
                  <option value="repair">Under Repair</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Issues</label>
                <textarea
                  className="w-full p-2 border rounded"
                  value={form.healthReport.issues.join("\n")}
                  onChange={(e) => updateForm({ 
                    healthReport: { issues: e.target.value.split("\n").filter(Boolean) }
                  })}
                  placeholder="Enter issues (one per line)"
                />
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isNew ? "Add Vehicle" : "Update Vehicle"}
        </button>
      </form>
    </div>
  );
}

// Hotel Form Component
export function HotelForm() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    coordinates: {
      latitude: "",
      longitude: ""
    },
    contactInfo: {
      phone: "",
      email: "",
      contactPerson: ""
    }
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (params.id) {
        setIsNew(false);
        const response = await fetch(`${baseUrl}/hotels/${params.id}`);
        const hotel = await response.json();
        setForm(hotel);
      }
    }
    fetchData();
  }, [params.id]);

  function updateForm(value) {
    return setForm((prev) => {
      if (value.coordinates) {
        return {
          ...prev,
          coordinates: { ...prev.coordinates, ...value.coordinates }
        };
      }
      if (value.contactInfo) {
        return {
          ...prev,
          contactInfo: { ...prev.contactInfo, ...value.contactInfo }
        };
      }
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const url = isNew ? `${baseUrl}/hotels` : `${baseUrl}/hotels/${params.id}`;
      const method = isNew ? "POST" : "PATCH";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error(response.statusText);
      navigate("/hotels");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">
        {isNew ? "Add Hotel" : "Edit Hotel"}
      </h3>
      <form onSubmit={onSubmit} className="border rounded-lg p-4">
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Hotel Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={form.name}
              onChange={(e) => updateForm({ name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              className="w-full p-2 border rounded"
              value={form.address}
              onChange={(e) => updateForm({ address: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Latitude</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={form.coordinates.latitude}
                onChange={(e) => updateForm({ 
                  coordinates: { latitude: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Longitude</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={form.coordinates.longitude}
                onChange={(e) => updateForm({ 
                  coordinates: { longitude: e.target.value }
                })}
              />
            </div>
          </div>
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Contact Information</h4>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Contact Person</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={form.contactInfo.contactPerson}
                  onChange={(e) => updateForm({ 
                    contactInfo: { contactPerson: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  className="w-full p-2 border rounded"
                  value={form.contactInfo.phone}
                  onChange={(e) => updateForm({ 
                    contactInfo: { phone: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded"
                  value={form.contactInfo.email}
                  onChange={(e) => updateForm({ 
                    contactInfo: { email: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isNew ? "Add Hotel" : "Update Hotel"}
        </button>
      </form>
    </div>
  );
}