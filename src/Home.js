import React, {useState, useEffect}  from "react";
import {Switch, Route, Link} from "react-router-dom";
import {readDeck, listDecks}  from "./utils/api/index.js";
import DeleteDeckButton from "./buttons/DeleteDeckButton.js";
import StudyButton from "./buttons/StudyButton.js";
import ViewButton from "./buttons/ViewButton.js";
import CreateDeckButton from "./buttons/CreateDeckButton";
//import CreateDeck from "./CreateDeck.js";
//import Deck from  "./Deck.js";
//import ErrorMessage from "./Layout/ErrorMessage";
import DeckList from "./deck/DeckList";
//import { listDecks } from "./utils/api/index.js";


export default function Home() {
  const [decks, setDecks] = useState([]);


  useEffect(() => {
    const abortCon = new AbortController();

    async function loadDecks() {
      try {
        const loadedDecks =  await listDecks();
        console.log(`home ${loadDecks}`)
        setDecks([...loadedDecks]);
      } catch (err) {throw err}
    }
    loadDecks();
    return abortCon.abort();
  }, []);

console.log("Home",decks)
  return (
    <div className="d-flex flex-column">
      <div className="mb-2">
        <Link className="btn btn-secondary" to="/decks/new">
          <i className="fa-solid fa-plus"></i> Create Deck
        </Link>
      </div>

      <div>
        <DeckList decks={decks} />
      </div>
    </div>
  );
}