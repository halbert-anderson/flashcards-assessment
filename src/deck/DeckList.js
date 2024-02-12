import React, {useState, useEffect} from "react";
import { useHistory} from "react-router-dom";
import {deleteDeck, listDecks} from "../utils/api/index";

function DeckList() {

//===========================================================================================
//==================using use hooks===========================================================
const [decks, setDecks] = useState([]);
const history =useHistory();

//===========================================================================================
//===========useEffect loads all the current decks in the database===========================
   useEffect(() => {
     setDecks([]);
     const abortController = new AbortController();
     async function loadDecks() {
      try {
         const loadedDecks =  await listDecks(abortController.signal);
         //console.log("DeckList - loadedDecks:", loadedDecks)
         setDecks(loadedDecks);
       } 
       catch (err) {
         throw err}
     }
  
     loadDecks();
     return () => abortController.abort();
     },[]);

//===========================================================================================
//=====click handler for delete button to delete a deck======================================
  const handleDeckDelete = async (event,id) =>  {

  // prevent default behavior of button when clicked 
    event.preventDefault();

     console.log("DeckList - id:",id);
     
     const result  = window.confirm("Delete this deck?\n\n\n You will not be able to recover it.");
        if (result) {

          //const abortController = new AbortController();
          
               try{
                   await deleteDeck(id);
                   const loadedDecks =  await listDecks();
                   setDecks(loadedDecks);
                   
                // TODO: After the deck is deleted, send the user to the home page.
                   history.push("/"); 
                // window.location.reload();   

                 } 
                 catch (err) {
                  throw err
                }
      
              //   return () => abortController.abort();   
         };
        }

//============================================================================================
// console.log("DeckList - decks: ", decks);

if(decks.length){
 
return(
    <div>
      {decks.map( deck =>( 
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
                  
                    <button className="btn btn-secondary mx-1" onClick={() => history.push(`/decks/${deck.id}`)}>                   
                      <span className="fa-solid fa-eye mr-1"></span>  
                       View
                    </button>
  
                   {/* TODO: study button doesn't render as expected */}
                    <button type="button" className="btn btn-primary mx-2" onClick={() => history.push(`/decks/${deck.id}/study`)}>
                      <span className="fa-solid fa-book mr-1"></span> 
                       Study
                    </button>
                  
                </div>
  
                <div className="flex-item"> 
  
                    <button type="button" className="btn btn-danger mx-2" onClick={(e)=>handleDeckDelete(e,deck.id)}>
                      <span className="fa-solid fa-trash-can"></span>
                       Delete
                    </button>
  
                </div>
  
              </div>
            </div>
          </div>))
          }  
    </div>
  )
        }
 return(<p>Deck List Loading...</p>)
}

//The DeckList function is exported into the Home componenet
export default DeckList;




// async function handleDelete(id) {
//     const abortController = new AbortController();
//     try {
//       const result = window.confirm(
//         "Delete this deck?/n/n/nYou will not be able to recover it."
//       );
//       if (result) {
//         await deleteDeck(id, abortController.signal);
//         window.location.reload();
//       }
//     } catch (err) {throw err}
//     return () => abortController.abort();
//   }


//  const decksListed = decks.map((deck) => {
//    return (
//     <div className="border rounded p-2 my-2" key={deck.id}>
//        <div>
//          <h3>
//         {deck.name}
//           <small className="float-right">{deck.cards.length} cards</small>
//          </h3>
//         </div>
//         <div>
//            <p>{deck.description}</p>
//         </div>
//          <div>
//                 <button className="btn btn-secondary mx-1" onClick={() => history.push(`/decks/${deck.id}`)}>
//                  <span className="oi oi-eye mx-1"></span>
//                       View
//                 </button>
//                   <button className="btn btn-primary" onClick={() => history.push(`/decks/${deck.id}/study`)}>
//                      <span className="oi oi-book mx-1"></span>
//                             Study
//                    </button>

//                  <DeckDelete deckId={deck.id} />
                 
//             </div>
//    </div>
//    );
//    });






