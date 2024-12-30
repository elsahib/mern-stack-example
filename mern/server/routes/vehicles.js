import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/vehicles", async (req, res) => {
    try {
      let collection = await db.collection("vehicles");
      let results = await collection.find({}).toArray();
      res.status(200).send(results);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching vehicles");
    }
  });
  
  router.post("/vehicles", async (req, res) => {
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
  

  export default router;