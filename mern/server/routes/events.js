import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Event Routes
// GET all events with related information
router.get("/events", async (req, res) => {
  try {
    let collection = await db.collection("events");
    let results = await collection.aggregate([
      {
        $lookup: {
          from: "performers",
          localField: "performerIds",
          foreignField: "_id",
          as: "performers"
        }
      },
      {
        $lookup: {
          from: "locations",
          localField: "locationId",
          foreignField: "_id",
          as: "location"
        }
      }
    ]).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching events");
  }
});

// GET single event by id
router.get("/events/:id", async (req, res) => {
  try {
    let collection = await db.collection("events");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);
    
    if (!result) res.status(404).send("Event not found");
    else res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching event");
  }
});

// POST new event
router.post("/events", async (req, res) => {
  try {
    let newEvent = {
      name: req.body.name,
      date: req.body.date,
      performerIds: req.body.performerIds.map(id => new ObjectId(id)),
      locationId: new ObjectId(req.body.locationId),
      status: req.body.status
    };
    let collection = await db.collection("events");
    let result = await collection.insertOne(newEvent);
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating event");
  }
});


export default router;