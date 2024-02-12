import React, {useState} from "react";
import { useParams,useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {deleteCard,readDeck} from "../utils/api/index";


function CardList({ deck }) {

//========================================================================================== 
//===using use hooks========================================================================
const [cards, setCards] =useState(deck.cards);
const {deckId} =useParams()
const history =useHistory();

//==========================================================================================
//=========click handler for delete button==================================================
  const handleCardDelete = async (event,id) =>  {
      event.preventDefault();
      
      const result = window.confirm("Delete this card?\n\n\n You will not be able to recover it.");
  
      if(result){
          try{
                await deleteCard(id);  
                const loadedDeck =  await readDeck(deckId);
                setCards(loadedDeck.cards);
                // TODO: After the card is deleted, send the user to the deck page.
                history.push(`/decks/${deckId}`);
                // window.location.reload();   
              } 
              catch (err) {
                throw err
              }
        }
   };
  
   
//================================================================================================

//console.log("cardList - cards:", cards);
if(cards){
  return (
    <div>
      {cards.map((card) => (
        <div className="card" key={card.id}>
          <div className="card-body">  
            <div className="d-flex justify-content-between">
              <div className="flex-item my-3">
                  <p className="card-text">{card.front}</p> 
              </div>
              <div className="flex-item my-3">
                  <p className="card-text">{card.back}</p> 
              </div>
            </div>  

            <div className="d-flex flex-row-reverse">
              <div className="flex-item">               
                 <button type="button" className="btn btn-primary mx-2" onClick={()=>history.push(`/decks/${deckId}/cards/${card.id}/edit`)}>
                   <span className="fa-solid fa-pencil mr-1"></span> Edit
                 </button>
                
                 <button type="button" className="btn btn-danger mx-2" onClick={(e)=>handleCardDelete(e,card.id)}>
                   <span className="fa-solid fa-trash-can mr-1"></span> Delete
                 </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 
return(<p>Card List Loading...</p>)
}
export default CardList;
