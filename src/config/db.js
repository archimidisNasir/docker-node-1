import { Sequelize } from "sequelize";

// Create Sequelize instance
const sequelize = new Sequelize("userdb", "user", "userpassword", {
  host: "mysql_container", // Use the service name from Docker Compose
  dialect: "mysql",
  logging: false, // Set to true if you want to see SQL logs
});

export default sequelize;
