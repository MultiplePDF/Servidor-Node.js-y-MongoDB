import express from "express";
import morgan from "morgan";
import helmet from "helmet";

import pkg from "../package.json";

import loteRoutes from "./routes/lote.routes";

const app = express();

// Settings
app.set("pkg", pkg);
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 4);

// Middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Welcome Routes
app.get("/", (req, res) => {
  res.json({
    message: "Server-DataBase",
    name: app.get("pkg").name,
    version: app.get("pkg").version,
    description: app.get("pkg").description,
    author: app.get("pkg").author,
  });
});

// Routes
app.use("/lote", loteRoutes);

export default app;
