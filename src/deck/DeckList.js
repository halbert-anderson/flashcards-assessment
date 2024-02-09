import React from "react";
import { useHistory} from "react-router-dom";
import {deleteDeck, listDecks} from "../utils/api/index";

function DeckList({ decks ,setDecks }) {

//===========================================================================================
//====using use hooks========================================================================
const history =useHistory();

//===========================================================================================
//=====click handler for delete button to delete a deck======================================
  const handleDelete = async (event,id) =>  {
     event.preventDefault();
     console.log("id:",id);
     
     const result  = window.confirm("Delete this deck?\n\n\n You will not be able to recover it.");
        if (result) {
                   await deleteDeck(id);
                   const loadedDecks =  await listDecks();
                   setDecks(loadedDecks);
                   
    // TODO: After the deck is deleted, send the user to the home page.
                   history.push("/"); 
                   window.location.reload();    
             }
    };

//============================================================================================
console.log("DeckList - decks:", decks);


  return (
    <div>
      {decks.map((deck) => (
        <div className="card" key={deck.id}>
          <div className="card-body">

            <div className="d-flex justify-content-between">
              <div className="flex-item">
                <h2 className="card-title">{deck.name}</h2>
              </div>
              <div className="flex-item">
                <p className="text-muted">
                  {/* TODO: find length of cards array */}
                  <small>{deck.cards.length} cards</small>
                </p>
              </div>
            </div>

            <p className="card-text">{deck.description}</p>
 
            <div className="d-flex justify-content-between">
              <div className="flex-item">
               
                 <button type="button" className="btn btn-secondary mx-2" onClick={() => history.push(`/decks/${deck.id}`)}>
                    View
                 </button>

                 {/* TODO: study button doesn't render as expected */}
                 <button type="button" className="btn btn-primary mx-2" onClick={() => history.push(`/decks/${deck.id}/study`)}>
                    Study
                 </button>
                
              </div>

              <div className="flex-item"> 

                 <button type="button" className="btn btn-danger mx-2" onClick={(e)=>handleDelete(e,deck.id)}>
                    <i className="fa-solid fa-trash-can"></i>
                    Delete
                 </button>

              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
 
export default DeckList;
/*
// <ViewDeckButton deckId={deckId} />
//<StudyDeckButton />
// <DeleteDeckButton deckId= {deck.id}/> 

async function handleDelete(id) {
    const abortCon = new AbortController();
    try {
      const result = window.confirm(
        "Delete this deck?/n/n/nYou will not be able to recover it."
      );
      if (result) {
        await deleteDeck(id, abortCon.signal);
        window.location.reload();
      }
    } catch (err) {throw err}
    return () => abortCon.abort();
  }

  */
  
  /*

 <Link
                  className="btn btn-secondary mr-2"
                  to={`decks/${deck.id}`}
                >
                  <i className="fa-solid fa-eye mr-1"></i>View
                </Link>
                <Link
                  className="btn btn-primary  mr-2"
                  to={`/decks/${deck.id}/study`}
                >
                  <i className="fa-solid fa-book mr-1"></i>Study
                </Link>
*/