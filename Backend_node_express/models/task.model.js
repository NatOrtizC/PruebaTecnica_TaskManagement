import { DataTypes } from "sequelize";
import sequelize from "../config/connection.js";
import { defaultValueSchemable } from "sequelize/lib/utils";

const title = {type:DataTypes.STRING, allowNull:false}
const description = {type:DataTypes.STRING, allowNull:false}
const status = {type:DataTypes.STRING, allowNull:false}
const priority = {type:DataTypes.SMALLINT, allowNull:false}
const dueDate = {type:DataTypes.DATE, allowNull:false}
const createdAt = {type:DataTypes.DATE, defaultValue:DataTypes.NOW}
const updatedAt = {type:DataTypes.DATE, defaultValue:DataTypes.NOW}

const tableName = {tableName:'tasks', timestamps: true, underscored: true}

const Task = sequelize.define('Task', {title, description, status, priority, dueDate, createdAt, updatedAt}, tableName)

export default Task