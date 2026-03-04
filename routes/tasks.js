const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Tasks = require("../models/Tasks");

router.get('/', async (req, res) => {
    try {
        const tasks = await Tasks.find().lean(); //lean() converts to clean JSON
        res.json(tasks);
        console.log(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newTask = await Tasks.create(req.body);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put('/:id', async (req, res) => {

    try {
        const { title, description , completed } = req.body;
        const result = await Tasks.updateOne({
                _id: req.params.id
            },
            {
                $set: {
                    title: title,
                    description: description,
                    completed: completed,
                }
        });

        if (result.matchedCount === 0) {
            return res.status(404).json({error: 'Not Found'});
        }
        res.json(result);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Tasks.findOne({ _id: req.params.id});
        await Tasks.deleteOne({ _id: req.params.id });
        res.json({message: "deleted"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;