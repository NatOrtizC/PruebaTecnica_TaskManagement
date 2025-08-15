import express, { response } from 'express'
import cors from 'cors'
import { request } from 'http'
import router from './routes/task.route.js'

const app = express()

// Middleware

app.use(express.json())
app.use(cors())

// Test Route

app.use('/tasks', router)

app.listen(3000, () => console.log("Corriendo servidor con puerto 3000"))