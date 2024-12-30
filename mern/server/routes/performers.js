import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Performer Routes
router.get("/", async (req, res) => {
  try {
    let collection = await db.collection("performers");
    let results = await collection.aggregate([
      {
        $lookup: {
          from: "hotels",
          localField: "hotelId",
          foreignField: "_id",
          as: "accommodation"
        }
      }
    ]).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching performers");
  }
});

// Add GET single performer by id
router.get("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    let collection = await db.collection("performers");
    let result = await collection.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "hotels",
          localField: "hotelId",
          foreignField: "_id",
          as: "accommodation"
        }
      }
    ]).toArray();
    if (result.length === 0) {
      res.status(404).send("Performer not found");
    } else {
      res.status(200).send(result[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching performer");
  }
});

// Add POST endpoint
router.post("/", async (req, res) => {
  try {
    let newPerformer = {
      name: req.body.name,
      hotelId: new ObjectId(req.body.hotelId),
      requirements: req.body.requirements
    };
    let collection = await db.collection("performers");
    let result = await collection.insertOne(newPerformer);
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating performer");
  }
});

// Add PATCH endpoint
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        hotelId: req.body.hotelId ? new ObjectId(req.body.hotelId) : null,
        requirements: req.body.requirements
      }
    };

    let collection = await db.collection("performers");
    let result = await collection.updateOne(query, updates);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating performer");
  }
});

// Add DELETE endpoint
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = await db.collection("performers");
    let result = await collection.deleteOne(query);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting performer");
  }
});

export default router;