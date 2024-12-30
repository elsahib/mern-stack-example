import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/drivers", async (req, res) => {
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
  
  router.post("/drivers", async (req, res) => {
    try {
      let newDriver = {
        name: req.body.name,
        license: req.body.license,
        assignedVehicleId: new ObjectId(req.body.assignedVehicleId),
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


  export default router;