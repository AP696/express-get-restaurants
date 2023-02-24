const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");

const port = 3000;

//TODO: Create your GET Request Route Below: 

app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occured while retrieving restaurants");
  }
});

app.get("/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    res.send(restaurant);
  } catch (err) {
    res.status(404).send("Restaurant not found");
  }
});


app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})