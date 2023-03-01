const { Router } = require("express");
const express = require("express");
const router = Router();
const { check, validationResult } = require("express-validator");
const { Restaurant } = require("../models/Restaurant");
const { sequelize } = require("../db");

router.use(express.json());

router.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occured while retrieving restaurants");
  }
});

router.get("/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    res.send(restaurant);
  } catch (err) {
    res.status(404).send("Restaurant not found");
  }
});

router.post("/restaurants", async (req, res) => {
  try {
    const { name, description, rating } = req.body;
    const restaurant = await Restaurant.create({
      name,
      description,
      rating,
    });
    res.status(201).json(restaurant);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occured while creating the restaurant");
  }
});

router.put("/restaurants/:id", async (req, res) => {
  try {
    const { name, description, rating } = req.body;
    const updatedRestaurant = await Restaurant.update(
      {
        name,
        description,
        rating,
      },
      {
        where: { id: req.params.id },
      }
    );
    if (updatedRestaurant[0]) {
      res.status(200).send("Restaurant updated successfully");
    } else {
      res.status(404).send("Restaurant not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occured while retrieving restaurants");
  }
});

router.delete("/restaurants/:id", async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.destroy({
      where: { id: req.params.id },
    });
    if (deletedRestaurant) {
      res.status(200).send("Restaurant deleted successfully");
    } else {
      res.status(404).send("Restaurant not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occured while deleting restaurant");
  }
});

module.exports = { router };
