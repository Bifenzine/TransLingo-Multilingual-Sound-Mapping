// import {getCar,getCars} from './database.js';
import cors from "cors";

import express from "express";
import { checkWordExists, deleteWord, editWord, getWords, insertWord } from "./database.js";
///////// put the port and the app in a canstants ///////////
const port = 7000;
const app = express();
/////////////////////////////////////////////

//////// enable the JSON Data //////////////////////
app.use(express.json());
////////////////////////////////

////////// core ///////////////
app.use(cors());
//////////////////////////////

app.get("/", async (req, res) => {
  const words = await getWords();
  res.send(words);
});

//add word

app.post('/insertWord', async (req, res) => {
  const { french, arabic, notChanged, changed, changedA_F } = req.body;
  try {
    const wordExist = await checkWordExists(french)

    if (wordExist) {
      return res.status(400).send('Word already exists')
    }

    const wordId = await insertWord(french, arabic, notChanged, changed, changedA_F);
    res.status(201).send({ id: wordId, message: 'word inserted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error inserting word');
  }
});

// delete word

app.delete('/deleteWord/:id', async (req, res) => {
  const wordId = req.params.id;
  try {
    await deleteWord(wordId);
    res.status(200).send({ message: 'Word deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting word');
  }
});

// edit word

app.put('/editWord/:id', async (req, res) => {
  const wordId = req.params.id;
  const { french, arabic, notChanged, changed, changedA_F } = req.body;
  try {
    await editWord(wordId, french, arabic, notChanged, changed, changedA_F);
    res.status(200).send({ message: 'Word updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating word');
  }
});



// ////////////// port ///////////////////

app.listen(port, () => {
  console.log("listening on port 7000");
});

//////////////////////////////////////
