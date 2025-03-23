import app from "./src/app.js";
import http from "http";
import sequelize from "./src/config/db.js";

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

sequelize.sync()
  .then(() => {
    console.log("Database synced successfully.");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("Sequelize Sync Error:", err));