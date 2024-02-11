import React from "react";
import CreateDeckButton from "./buttons/CreateDeckButton";
import DeckList from "./deck/DeckList";



export default function Home() {

//===============================================================================

 


  
 
  return (
     <div className="d-flex flex-column">
        <div className="mb-2">
          <CreateDeckButton />
        </div>

        <div>
          <DeckList />
        </div>
    </div>
  );
  }
 

  /*
const [decks, setDecks] = useState([]);

useEffect(() => {
 setDecks([]);
  const abortController = new AbortController();
  async function loadDecks() {
    try {
      const loadedDecks =  await listDecks(abortController.signal);
      console.log("Home - loadedDecks:", loadedDecks)
      setDecks(loadedDecks);
    } catch (err) {throw err}
  }

   loadDecks();
  return ()=>abortController.abort();
  },[]);

  console.log("Home - decks:", decks)
  if(decks){ ...}{
   return (
     <div className="d-flex flex-column">
        <div className="mb-2">
          <CreateDeckButton />
        </div>

        <div>
          <DeckList decks={decks} setDecks={setDecks} />
        </div>
    </div>
  );
  }
  */
/*
<Link className="btn btn-secondary" to="/decks/new">
          <i className="fa-solid fa-plus"></i> Create Deck
        </Link>
*/