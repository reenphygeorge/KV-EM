import express from "express";
import { Employee } from "../data/Employee";
import dataSource from "../data/data-source";

export const employeeRouter = express.Router();
const employeeRepository = dataSource.getRepository(Employee);

employeeRouter.get("/", async (_, res) => {
  try {
    const data = await employeeRepository.find();
    res.json({ sucess: true, data });
  } catch (error) {
    res.status(500).json({ sucess: false, msg: "Something went wrong" });
  }
});

employeeRouter.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = await employeeRepository.findOneBy({
      id,
    });
    if (!data) {
      return res
        .status(404)
        .json({ sucess: false, error: "Employee not found" });
    }
    res.json({ sucess: true, data });
  } catch (error) {
    res.status(500).json({ sucess: false, error: "Something went wrong" });
  }
});

employeeRouter.post("/", async (req, res) => {
  try {
    const newEmployee = new Employee();
    newEmployee.email = req.body.email;
    newEmployee.name = req.body.name;
    const savedEmployee = await employeeRepository.save(newEmployee);
    res.json({
      sucess: true,
      message: "Employee Created!",
      data: savedEmployee,
    });
  } catch ({ message }) {
    res.status(500).json({ sucess: false, error: "Something went wrong" });
  }
});

employeeRouter.put("/", async (req, res) => {
  try {
    const id = Number(req.body.id);
    const data = await employeeRepository.findOneBy({
      id,
    });
    if (!data) {
      return res
        .status(404)
        .json({ sucess: false, error: "Employee not found" });
    }
    await employeeRepository.update({ id }, { ...req.body });
    res.json({ sucess: true, message: "Employee Updated!" });
  } catch ({ message }) {
    res.status(500).json({ sucess: false, error: "Something went wrong" });
  }
});

employeeRouter.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = await employeeRepository.findOneBy({
      id,
    });
    if (!data) {
      return res
        .status(404)
        .json({ sucess: false, error: "Employee not found" });
    }
    employeeRepository.delete({ id });
    res.json({ sucess: true, message: "Employee Deleted!" });
  } catch ({ message }) {
    res.status(500).json({ sucess: false, error: "Something went wrong" });
  }
});
