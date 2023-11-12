const Admin = require("../models/admin.js");

const todoGet = async (req, res) => {
  const todo = await Admin.findOne();

  res.status(200).json(todo);
};
const todoSet = async (req, res) => {
  const admin = await Admin.findOne();
  const data = req.body.todo;
  const databig = req.body.todoBig;
  admin.todo = data;
  admin.todoBig = databig;
  await admin.save();

  res.status(200).json({ data: admin, message: "Success" });
};

module.exports = { todoGet, todoSet };
