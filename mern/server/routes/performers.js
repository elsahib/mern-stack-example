import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Performer Routes
router.get("/performers", async (req, res) => {
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
  
  router.post("/performers", async (req, res) => {
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
  
  export default router;