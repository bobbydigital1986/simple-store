// const express = require("express");

import express from "express";
import cors from "cors"
// const cors = require("cors");
const app = express();
const PORT = 8080;

app.use(cors());

const products = [
  { id: 1, name: "Pasta" },
  { id: 2, name: "Cheese" },
  { id: 3, name: "Wine" },
];

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

export default app
