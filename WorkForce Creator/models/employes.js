const mongoose = require("mongoose");

const employeeSChema = new mongoose.Schema({
  name: String,
  salary: Number,
  language: String,
  city: String,
  isManager: Boolean,
});

const Employee = mongoose.model("Employee", employeeSChema);
module.exports = Employee;
