require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = 8000;

app.use(
  cors({
    origin: " http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", require("./routes/jobRouter"));


app.listen(PORT, () =>
  console.log(`app listening on http://127.0.0.1:${PORT}/api/`)
);
