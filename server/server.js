import dotenv from "dotenv";
dotenv.config(); // MUST be first, no path tricks needed

import app from "./src/app.js";
import connectDB from "./src/config/db.js";

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("CLIENT_URL =", process.env.CLIENT_URL);
  console.log(`Server running on port ${PORT}`);
});

