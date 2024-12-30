import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
      let collection = await db.collection("drivers");
      let results = await collection.aggregate([
        {
          $lookup: {
            from: "vehicles",
            localField: "assignedVehicleId",
            foreignField: "_id",
            as: "vehicle"
          }
        }
      ]).toArray();
      res.status(200).send(results);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching drivers");
    }
  });

// Add GET endpoint to fetch a driver by ID
router.get("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    let collection = await db.collection("drivers");
    let result = await collection.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "vehicles",
          localField: "assignedVehicleId",
          foreignField: "_id",
          as: "vehicle"
        }
      }
    ]).toArray();
    if (result.length === 0) {
      res.status(404).send("Driver not found");
    } else {
      res.status(200).send(result[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching driver");
  }
});
  
  router.post("/", async (req, res) => {
    try {
      let newDriver = {
        name: req.body.name,
        license: req.body.license,
        assignedVehicleId: req.body.assignedVehicleId ? new ObjectId(req.body.assignedVehicleId) : null, // Set to null if empty string
        status: req.body.status
      };
      let collection = await db.collection("drivers");
      let result = await collection.insertOne(newDriver);
      res.status(201).send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error creating driver");
    }
  });

  // Add PATCH endpoint
  router.patch("/:id", async (req, res) => {
    try {
      const query = { _id: new ObjectId(req.params.id) };
      const updates = {
        $set: {
          name: req.body.name,
          license: req.body.license,
          assignedVehicleId: req.body.assignedVehicleId ? new ObjectId(req.body.assignedVehicleId) : null,
          status: req.body.status
        }
      };
  
      let collection = await db.collection("drivers");
      let result = await collection.updateOne(query, updates);
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating driver");
    }
  });
  
  // Add DELETE endpoint
  router.delete("/:id", async (req, res) => {
    try {
      const query = { _id: new ObjectId(req.params.id) };
      const collection = await db.collection("drivers");
      let result = await collection.deleteOne(query);
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error deleting driver");
    }
  });

  export default router;