import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
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

//add GET endpoint to fetch a movement by ID
router.get("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    let collection = await db.collection("movements");
    let result = await collection.aggregate([
      { $match: query },
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
    if (result.length === 0) {
      res.status(404).send("Movement not found");
    } else {
      res.status(200).send(result[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching movement");
  }
});
  
router.post("/", async (req, res) => {
    try {
      let newMovement = {
        performerId: req.body.performerId? new ObjectId(req.body.performerId): null,
        driverId: req.body.driverId? new ObjectId(req.body.driverId):null,
        vehicleId: req.body.vehicleId? new ObjectId(req.body.vehicleId): null,
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

// Add PATCH endpoint
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        performerId: req.body.performerId ? new ObjectId(req.body.performerId) : null,
        driverId: req.body.driverId ? new ObjectId(req.body.driverId) : null,
        vehicleId: req.body.vehicleId ? new ObjectId(req.body.vehicleId) : null,
        departureLocation: req.body.departureLocation,
        destination: req.body.destination,
        scheduledTime: req.body.scheduledTime,
        status: req.body.status
      }
    };

    let collection = await db.collection("movements");
    let result = await collection.updateOne(query, updates);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating movement");
  }
});

// Add DELETE endpoint
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = await db.collection("movements");
    let result = await collection.deleteOne(query);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting movement");
  }
});
  
  export default router;
