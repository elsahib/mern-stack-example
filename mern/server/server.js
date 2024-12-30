import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import hotels from "./routes/hotels.js"
import drivers from "./routes/drivers.js"
import events from "./routes/events.js"
import movments from "./routes/movements.js"
import vehicles from "./routes/vehicles.js"
import performers from "./routes/performers.js"


const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);
app.use("/hotels", hotels);
app.use("/drivers", drivers);
app.use("/events", events);
app.use("/movements", movments);
app.use("/vehicles", vehicles);
app.use("/performers", performers);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
