const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Task = require('../models/task.model');

// GET all tasks (wrapped with asyncHandler)
router.get('/', asyncHandler(async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
}));

router.post('/', asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.status(400);
    throw new Error('Please provide a title'); 
  }
  const task = new Task({ title });
  const newTask = await task.save();
  res.status(201).json(newTask);
}));

router.put('/:id', asyncHandler(async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!updatedTask) {
    res.status(404);
    throw new Error('Task not found');
  }
  res.json(updatedTask);
}));

router.patch('/:id', asyncHandler(async (req, res) => {
  const { completed } = req.body; 

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,       
    { completed },         
    { new: true }          
  );

  if (!updatedTask) {
    res.status(404);
    throw new Error('Task not found');
  }

  res.status(200).json(updatedTask);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }
  res.json({ message: 'Task deleted successfully' });
}));

module.exports = router;


//query and mutation
//act