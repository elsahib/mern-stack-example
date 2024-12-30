import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Hotel Routes
router.get("/", async (req, res) => {
  try {
    let collection = await db.collection("hotels");
    let results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching hotels");
  }
});

// Add GET single hotel by id
router.get("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    let collection = await db.collection("hotels");
    let result = await collection
      .find(query)
      .toArray();
    if (result.length === 0) {
      res.status(404).send("Hotel not found");
    } else {
      res.status(200).send(result[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching hotel");
  }
});


router.post("/", async (req, res) => {
  try {
    let newHotel = {
      name: req.body.name,
      address: req.body.address,
      coordinates: req.body.coordinates,
      contactInfo: req.body.contactInfo
    };
    let collection = await db.collection("hotels");
    let result = await collection.insertOne(newHotel);
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating hotel");
  }
});

// Add this PATCH route
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        address: req.body.address,
        coordinates: req.body.coordinates,
        contactInfo: req.body.contactInfo
      }
    };

    let collection = await db.collection("hotels");
    let result = await collection.updateOne(query, updates);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating hotel");
  }
});

// Add DELETE endpoint
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = await db.collection("hotels");
    let result = await collection.deleteOne(query);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting hotel");
  }
});

export default router;