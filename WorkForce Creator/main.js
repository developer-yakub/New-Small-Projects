const express = require("express");
const mongoose = require("mongoose");
const Employee = require("./models/employes.js");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
mongoose.connect("mongodb://127.0.0.1:27017/company");

const getRandom = (arr) => {
  let rno = Math.floor(Math.random() * (arr.length - 1));
  return arr[rno];
};

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/generate", async (req, res) => {
  await Employee.deleteMany({});

  let randomNames = ["sohail", "sufiyaan", "sheza", "maqbul", "gousia"];
  let randomLang = ["java", "python", "javascript", "c", "c++"];
  let randomCities = [
    "warangal",
    "hydderabad",
    "subedari",
    "jangoan",
    "huzurabad",
  ];

  for (let index = 0; index < 10; index++) {
    let e = await Employee.create({
      name: getRandom(randomNames),
      salary: Math.floor(Math.random() * 22000),
      language: getRandom(randomLang),
      city: getRandom(randomCities),
      isManager: Math.random() > 0.5 ? true : false,
    });

    console.log(e);
  }

  res.render("index");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
