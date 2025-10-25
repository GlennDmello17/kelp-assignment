// database/db.js
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

// ✅ Create a connection pool (better for production)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// ✅ Function to connect to database
export async function connectDB() {
  try {
    await pool.connect();
    console.log("✅ Connected to the database successfully.");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1); // Exit app if DB connection fails
  }
}

// ✅ Function to create table safely
export async function createTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS public.users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      age INT NOT NULL,
      address JSONB,
      additional_info JSONB
    );
  `;

  try {
    await pool.query(query);
    console.log("🧱 Table 'users' checked/created successfully.");
  } catch (error) {
    console.error("❌ Error creating table:", error);
  }
}


export async function insertToDB(dataArray) {
  try{
   for (const user of dataArray) {
      const name = user.name.firstName +" "+ user.name.lastName || "Unknown";
     
      const age = parseInt(user.age) || 0;

      const address = user.address ? JSON.stringify(user.address) : null;
      const additionalInfo = {
        gender: user.gender || null,
        food: user.food || null,
      };

      await pool.query(
        `INSERT INTO public.users (name, age, address, additional_info)
        VALUES ($1, $2, $3, $4)`,
        [name, age, address, additionalInfo]
      );
    }
    console.log("✅ Data inserted successfully.");
  } catch (error) {
      console.error("❌ Error inserting data:", error);
  }
}

export async function printAgeDistribution() {
  try {
    const result = await pool.query("SELECT age FROM public.users");
    const ages = result.rows.map((row) => row.age);

    if (ages.length === 0) {
      console.log("No users found to calculate age distribution.");
      return;
    }

    // Counters
    let group1 = 0; // < 20
    let group2 = 0; // 20–40
    let group3 = 0; // 40–60
    let group4 = 0; // > 60

    for (const age of ages) {
      if (age < 20) group1++;
      else if (age <= 40) group2++;
      else if (age <= 60) group3++;
      else group4++;
    }

    const total = ages.length;
    const pct = (count) => ((count / total) * 100).toFixed(2);

    console.log("\n📊 Age Distribution Report:");
    console.log("Age Group        % Distribution");
    console.log(`< 20             ${pct(group1)}`);
    console.log(`20 - 40          ${pct(group2)}`);
    console.log(`40 - 60          ${pct(group3)}`);
    console.log(`> 60             ${pct(group4)}\n`);
  } catch (error) {
    console.error("❌ Error calculating age distribution:", error);
  }
}
