import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/movements", async (req, res) => {
    try {
      let collection = await db.collection("movements");
      let results = await collection.aggregate([
        {
          $lookup: {
            from: "performers",
            localField: "performerId",
            foreignField: "_id",
            as: "performer"
          }
        },
        {
          $lookup: {
            from: "drivers",
            localField: "driverId",
            foreignField: "_id",
            as: "driver"
          }
        },
        {
          $lookup: {
            from: "vehicles",
            localField: "vehicleId",
            foreignField: "_id",
            as: "vehicle"
          }
        }
      ]).toArray();
      res.status(200).send(results);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching movements");
    }
  });
  
  router.post("/movements", async (req, res) => {
    try {
      let newMovement = {
        performerId: new ObjectId(req.body.performerId),
        driverId: new ObjectId(req.body.driverId),
        vehicleId: new ObjectId(req.body.vehicleId),
        departureLocation: req.body.departureLocation,
        destination: req.body.destination,
        scheduledTime: new Date(req.body.scheduledTime),
        status: req.body.status
      };
      let collection = await db.collection("movements");
      let result = await collection.insertOne(newMovement);
      res.status(201).send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error creating movement");
    }
  });
  
  export default router;
