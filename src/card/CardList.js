import React from "react";
import { useParams,useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {deleteCard} from "../utils/api/index";


function CardList({ cards }) {

//=============================================================================================
const {deckId} =useParams()
const history =useHistory();

//==============================================================================================
  const handleDelete = async (cardId) => {
    
   const result = window.confirm("Delete this deck?\n\n\n You will not be able to recover it.");
   if (result) {
     await deleteCard(cardId);
     // TODO: After the deck is deleted, send the user to the home page.
     history.push(`/decks/${deckId}`);     
   }
   
 };
  
//================================================================================================

console.log("cardList - cards:", cards);

  return (
    <div>
      {cards.map((card) => (
        <div className="card" key={card.id}>
          <div className="card-body">       
            <p className="card-text">{card.description}</p>
            <div className="d-flex justify-">
              <div className="flex-item">               
                 <button type="button" className="btn btn-primary mx-2" onClick={() => history.push(`/decks/${deckId}/cards/${card.id}/edit`)}>
                    Edit
                 </button>
                
                 <button type="button"  className="btn btn-secondary mx-2" onClick={handleDelete(card.id)}>
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

export default CardList;
/*
// <ViewDeckButton deckId={deckId} />
//<StudyDeckButton />
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

<button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => handleDelete(deck.id)}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>

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