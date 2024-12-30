import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let collection = await db.collection("vehicles");
    let results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching vehicles");
  }
});

// Add GET single vehicle by id
router.get("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    let collection = await db.collection("vehicles");
    let result = await collection.find(query).toArray();
    if (result.length === 0) {
      res.status(404).send("Vehicle not found");
    } else {
      res.status(200).send(result[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching vehicle");
  }
});

// Add POST endpoint
router.post("/", async (req, res) => {
  try {
    let newVehicle = {
      model: req.body.model,
      plate: req.body.plate,
      capacity: req.body.capacity,
      healthReport: {
        lastInspection: req.body.healthReport.lastInspection,
        status: req.body.healthReport.status,
        issues: req.body.healthReport.issues || []
      }
    };
    let collection = await db.collection("vehicles");
    let result = await collection.insertOne(newVehicle);
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating vehicle");
  }
});

// Add this PATCH route
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        model: req.body.model,
        plate: req.body.plate,
        capacity: req.body.capacity,
        healthReport: req.body.healthReport
      }
    };

    let collection = await db.collection("vehicles");
    let result = await collection.updateOne(query, updates);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating vehicle");
  }
});

// Add DELETE endpoint
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = await db.collection("vehicles");
    let result = await collection.deleteOne(query);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting vehicle");
  }
});

export default router;