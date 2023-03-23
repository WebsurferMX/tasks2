const express = require('express')
const router = express.Router()
const { getTasks, setTasks, updateTasks, deleteTasks } = require('../controllers/tasksController')   
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getTasks).post(protect, setTasks)

//router.get('/', protect, getTareas)
//router.post('/', setTareas)

router.route('/:id').put(protect, updateTasks).delete(protect, deleteTasks)
//router.put('/:id', updateTareas)
//router.delete('/:id', deleteTareas)

module.exports = router
