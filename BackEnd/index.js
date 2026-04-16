import express from "express";
//so that whenever there is a cookie in the browser we can access it in the backend
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
// import connectDB from "./utils/db.js";
import { connectDB } from "./utils/db.js"; // <-- Corrected import for named export
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174",
  "https://job-portal-olive-eight.vercel.app"
];
const corsOptions = {
  origin: allowedOrigins, // allow all for now
  credentials: true,
};
app.use(cors(corsOptions));

//apis
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

//Will run on port 8000 otherwise will run on port 3000
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
