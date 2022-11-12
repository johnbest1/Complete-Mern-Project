const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({ createdAt: -1 })
        res.status(200).json(workouts)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid id' })
    }
    try {
        const workout = await Workout.findById(id)
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body
    let emptyFields = [];
    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        console.log(emptyFields)
    }
    try {
        const workout = await Workout.create({ title, load, reps })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const deleteWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid id' })
    }
    try {
        const workout = await Workout.findOneAndDelete({ _id: id })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid id' })
    }
    try {
        const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



module.exports = {
    getWorkouts,
    getWorkout, createWorkout, deleteWorkout, updateWorkout
}