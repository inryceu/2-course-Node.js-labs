import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import programRoutes from "./src/routes/ProgramRoutes.js";
import showRoutes from "./src/routes/ShowRoutes.js";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", programRoutes);
app.use("/", showRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
