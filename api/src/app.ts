import express from "express";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { dataSource } from "./db/data-source.db";
import employeeRouter from "./routes/employee.route";
import { errorHandler } from "./middlewares/errorHandler";
import departmentRouter from "./routes/department.route";

const app = express();
dotenv.config();

const corsOptions: CorsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(loggerMiddleware);

app.get("/", (_, res) => {
  try {
    res.json({ sucess: true, msg: "Server Running" });
  } catch (error) {
    res.status(500).json({ sucess: false, msg: "Something went wrong" });
  }
});

app.use("/employee", employeeRouter);

app.use("/department", departmentRouter);

app.use(errorHandler);

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
