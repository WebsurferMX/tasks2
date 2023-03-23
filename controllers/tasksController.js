const asyncHandler = require('express-async-handler')
const Task = require('../models/taskModel')

const getTasks = asyncHandler(async (req, res) => {

    const tasks = await Tasks.find({ user: req.user.id })

    res.status(200).json(tasks)
}) 

const setTasks = asyncHandler(async (req, res) => {

    if (!req.body.texto) {
        //res.status(400).json({ mensaje: 'Favor de teclear la descripción de la tarea' })
        res.status(400)
        throw new Error('Favor de teclear una descripción para la tarea')
    }

    const task = await Task.create({
        texto: req.body.texto,
        user: req.user.id
    })

    res.status(201).json(task)
})

const updateTasks = asyncHandler(async (req, res) => { 

    const tasks = await Task.findById(req.params.id)

    //Verificamos que la tarea exista
    if (!task) {
        res.status(400)
        throw new Error('Tarea no encontrada')
    }

    //Verificamos que la tarea pertenece al usuario del token
    if (task.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Acceso no Autorizado, la tarea no pertenece al usuario logeado')
    }

    const taskModificada = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(taskModificada)
})

const deleteTasks = asyncHandler(async (req, res) => {

    const task = await Tasks.findById(req.params.id)

    if (!task) {
        res.status(400)
        throw new Error('Tarea no encontrada')
    }

    //Verificamos que la tarea pertenece al usuario del token
    if (task.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Acceso no Autorizado, la tarea no pertenece al usuario logeado')
    }

    //await tarea.remove()
    await task.deleteOne()

    //const tareaBorrada = await Tarea.findByIdAndDelete(req.params.id)

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getTasks,
    setTasks,
    updateTasks,
    deleteTasks
}
