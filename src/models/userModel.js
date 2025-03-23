import { DataTypes } from "sequelize";
import db from "../config/db.js"; // Import your Sequelize instance

const User = db.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "all_user", // Ensure it matches your database table name
    timestamps: true, // Adds createdAt and updatedAt columns
});

export default User;
