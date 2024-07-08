// routes/notes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const Note = require('../models/Note');

const router = express.Router();

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
  
  router.get('/', authMiddleware, async (req, res) => {
    try {
      const notes = await Note.find({ user: req.userId });
      res.json(notes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching notes' });
    }
  });
  
  router.post('/', authMiddleware, async (req, res) => {
    try {
      const { text, color } = req.body;
      const newNote = new Note({ user: req.userId, text, color });
      await newNote.save();
      res.status(201).json(newNote);
    } catch (error) {
      res.status(500).json({ message: 'Error creating note' });
    }
  });
  
  router.put('/:id', authMiddleware, async (req, res) => {
    try {
      const { text } = req.body;
      const note = await Note.findOneAndUpdate(
        { _id: req.params.id, user: req.userId },
        { text },
        { new: true }
      );
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.json(note);
    } catch (error) {
      res.status(500).json({ message: 'Error updating note' });
    }
  });
  
  router.delete('/:id', authMiddleware, async (req, res) => {
    try {
      const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.userId });
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.json({ message: 'Note deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting note' });
    }
  });
  
  module.exports = router;