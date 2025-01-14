import "dotenv/config";
import express from "express";
import itemsRoutes from "./routes/itemsRoute.js";

const app = express();

const PORT = process.env.PORT || 5050;

// basic home route
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

//items route
app.use("/items", itemsRoutes);


app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});