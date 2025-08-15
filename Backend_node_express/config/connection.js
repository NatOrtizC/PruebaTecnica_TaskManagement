import { Sequelize } from "sequelize";

const database = 'task_database'
const username = 'postgres'
const password = 'Admin'
const host = 'localhost'

const config = { host:host, dialect:'postgres' }

const sequelize = new Sequelize(database, username, password, config)

export default sequelize