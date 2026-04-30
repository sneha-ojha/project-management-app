const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);

    // 🔥 IMPORTANT: don’t silently fail
    process.exit(1);
  }
};

// 🔥 handle runtime disconnects (VERY IMPORTANT on Render)
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected. Reconnecting...");
  connectDB();
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB runtime error:", err.message);
});

module.exports = connectDB;