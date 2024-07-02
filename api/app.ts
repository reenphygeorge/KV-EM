import express, { Response } from "express";

const app = express();
app.use(express.json());

const port = 3000;

app.get("/", (_, res: Response) => {
  try {
    res.json({ sucess: true, msg: "Server Running" });
  } catch (error) {
    res.status(500).json({ sucess: false, msg: "Something went wrong" });
  }
});

app.get("/employee", (_, res) => {
  try {
    let profile = {
      name: "Reenphy",
      age: 21,
    };
    res.json({ sucess: true, data: profile });
  } catch (error) {
    res.status(500).json({ sucess: false, msg: "Something went wrong" });
  }
});

app.post("/", (req, res) => {
  try {
    console.log(req.body);
    res.status(201).json({ sucess: true, data: req.body });
  } catch (error) {
    res.status(500).json({ sucess: false, msg: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server listening in ${port}`);
});
