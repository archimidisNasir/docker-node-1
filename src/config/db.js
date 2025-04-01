// import mysql from "mysql2/promise";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables

// const db = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// export default db; // ✅ Use `export default` so it can be imported correctly


import { Sequelize } from "sequelize";

// Create Sequelize instance
const sequelize = new Sequelize("userdb", "user", "userpassword", {
  host: "mysql_container", // Use the service name from Docker Compose
  dialect: "mysql",
  logging: false, // Set to true if you want to see SQL logs
});

export default sequelize;
