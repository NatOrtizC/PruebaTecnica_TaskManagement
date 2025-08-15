import express from 'express'
import {createTask, deleteTask, taskId, taskList, updateTask} from '../controllers/task.controller.js'

const router = express.Router()

// Se crean los endpoint

router.post('/', createTask)
router.get('/', taskList)
router.get('/:id', taskId)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

export default router