import express from "express";
import { employeeRouter } from "./routes/employee";
import { logger } from "./middlewares/logger";
import dataSource from "./data/data-source";

const app = express();
app.use(express.json());
app.use(logger);

app.get("/", (_, res) => {
  try {
    res.json({ sucess: true, msg: "Server Running" });
  } catch (error) {
    res.status(500).json({ sucess: false, msg: "Something went wrong" });
  }
});

app.use("/employee", employeeRouter);

(async () => {
  try {
    await dataSource.initialize();
    console.log("DB Connection Success!");
  } catch (error) {
    console.log("Failed", error);
    process.exit(1);
  }
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening in ${process.env.PORT || 3000}`);
  });
})();
