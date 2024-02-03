import React, {useState, useEffect}  from "react";
//import { Link} from "react-router-dom";
import { listDecks}  from "./utils/api/index.js";
import CreateDeckButton from "./buttons/CreateDeckButton";
import DeckList from "./deck/DeckList";



export default function Home() {

//===============================================================================

  const [decks, setDecks] = useState([]);

  useEffect(() => {

    const abortCon = new AbortController();
    async function loadDecks() {
      try {
        const loadedDecks =  await listDecks();
        console.log("Home - loadedDecks:", loadedDecks)
        setDecks(loadedDecks);
      } catch (err) {throw err}
     }

     loadDecks();
    return abortCon.abort();
    }, []);

  console.log("Home - decks:", decks)
  return (
     <div className="d-flex flex-column">
        <div className="mb-2">
          <CreateDeckButton />
        </div>

        <div>
          <DeckList decks={decks} />
        </div>
    </div>
  );
}

/*
<Link className="btn btn-secondary" to="/decks/new">
          <i className="fa-solid fa-plus"></i> Create Deck
        </Link>
*/