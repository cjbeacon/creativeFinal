const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

//
// Notes
//

const noteSchema = new mongoose.Schema({
  title: String,
  txt: String,
  usrid: String,
});

const Note = mongoose.model('Note', noteSchema);

router.get('/:id', auth.verifyToken, async (req, res) => {
  try {
    let notes = await Note.find({ "usrid": req.params.id});
    return res.send(notes);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  const note = new Note({
    title: req.body.title,
    txt: req.body.txt,
    usrid: req.body.usrid,
  });
  try {
    await note.save();
    return res.send(note);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete('/:id', auth.verifyToken, async (req, res) => {
  try {
    await Note.deleteOne({
      _id: req.params.id
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;