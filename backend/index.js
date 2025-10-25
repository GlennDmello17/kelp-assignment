// index.js
import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { connectDB, createTable , insertToDB ,getAgeDistribution} from "./database/db.js";
import parseCSV from "./controllers/converter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to database and ensure table exists
await connectDB();
await createTable();

// Multer setup (in-memory file storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// CSV upload route
app.post("/upload", upload.single("csvFile"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  try {
    const csvContent = req.file.buffer.toString("utf-8");
    const jsonData = parseCSV(csvContent);
    // Insert parsed data into the database
    await insertToDB(jsonData);
    const ageDistribution = await getAgeDistribution();
    res.json({
      message: "File uploaded and converted successfully.",
      data: jsonData,
      ageDistribution,
    });
  } catch (error) {
    console.error("Error parsing CSV:", error);
    res.status(500).json({ error: "Failed to process CSV." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
