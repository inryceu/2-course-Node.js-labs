import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import programRoutes from "./src/routes/ProgramRoutes.js";
import channelRouter from "./src/routes/ChannelRoutes.js";
import showRouter from "./src/routes/ShowRoutes.js";
import authRouter from "./src/routes/AuthRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/schedule", programRoutes);
app.use("/auth", authRouter);
app.use("/", showRouter);
app.use("/", channelRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
