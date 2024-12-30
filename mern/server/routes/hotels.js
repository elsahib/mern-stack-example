import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Hotel Routes
router.get("/hotels", async (req, res) => {
    try {
      let collection = await db.collection("hotels");
      let results = await collection.find({}).toArray();
      res.status(200).send(results);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching hotels");
    }
  });
  
  router.post("/hotels", async (req, res) => {
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
  
  export default router;