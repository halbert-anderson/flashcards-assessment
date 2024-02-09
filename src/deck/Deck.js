import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {readDeck,deleteDeck, listDecks} from "../utils/api/index.js"
import CardList from "../card/CardList.js";
import DeckList from "./DeckList.js";


 function Deck() {

 //===================================================================== 
 //===setting state and using hooks===========================       
      const [deck, setDeck] = useState({});
      const [cards, setCards] = useState([]);
      const [decks, setDecks] = useState([]);
      const { deckId } = useParams(); 
      const history = useHistory();
 
//==useEffect hook to set state for deck object and cards array=========
console.log("Deck -anything");
useEffect(() => {
console.log("Deck -anything2");
   setDeck({});
   // setCards([]);
   const abortController = new AbortController();
   async function loadDeckAndCards() {   
      try{            
         console.log("Deck - deckId:", deckId);
         const response = await readDeck(deckId, abortController.signal);
         console.log("Deck - RESPONSE:",response);
         console.log("Deck - RESPONSE.cards:",response.cards);
         setDeck(response);
         setCards(response.cards);
      } 
      catch (err) {
         throw err;
      }
   }

   loadDeckAndCards();
   return () => abortController.abort();
 
},[deckId]);
 


//==========================================================================================
//=========click handler for delete button===================

const handleDeckDelete = async (event) => {
    
   // prevent default behavior of button  when clicked 
   event.preventDefault();

   const result = window.confirm("Delete this deck?\n\n\n You will not be able to recover it.");
   if (result) {

     await deleteDeck(deckId);

     // TODO: After the deck is deleted, send the user to the home page.
     const loadedDecks =  await listDecks(deckId);
     setDecks(loadedDecks);
     DeckList({decks})
     history.push("/");     
   }
   
 };

//==========================================================================================
    console.log("Deck - deck:", deck);
    console.log("Deck - deck.cards:", deck.cards);   
    console.log("Deck - cards:", cards);
if (deck.id){
     return( 
      <div>
        
            <nav aria-label="breadcrumb">
           
                  <Link to={'/'}> Home </Link>
                  
                     <span className="breadcrumb-arrow">&#47;</span>
               
                  <Link to={"#"}> {deck.name} </Link>
               
            </nav>
          
            <div className="card" key={deck.id}>
             <div className="card-body">
                <div> 
                   <h1>{deck.name}</h1>  
                </div>
              
                <div>
                   <p>{deck.description}</p>
                </div>

                <div className="d-flex justify-content-between">
                  <div className="flex-item">

                     <button type="button" className="btn btn-secondary mx-2"  onClick={history.push(`/decks/${deck.id}/edit`)}>
                         Edit
                     </button>

                     <button type="button" className="btn btn-primary mx-2" onClick={history.push(`/decks/${deck.id}/study`)}>
                         Study
                     </button>

                     <button type="button" className="btn btn-primary mx-2" onClick={() => history.push(`/decks/${deck.id}/cards/new`)}>
                         Add Cards
                     </button>
                  </div>

                  <div className="flex-item">

                     <button type="button" className="btn btn-danger mx-2" onClick={handleDeckDelete}>
                         <i className="fa-solid fa-trash-can"></i>Delete
                     </button>

                  </div>
                </div>
             </div> 
           </div>
            <h2>Cards</h2>
            {/* <div>{cards}</div> */}
            <CardList cards={cards} setCards={setCards} />    
           
      </div> 
      
   );

     }
      return(<p>Loading...</p>);
  }
  
 

 export default Deck;




 /*

Asynchronous tasks are callbacks sent to the queue of callbacks of the event loop. They are asynchronous because they won't be executed until some conditions are met.
Any mechanism that can add a callback to the queue of callbacks, thereby deferring its execution until the fulfillment of a condition, can be considered as a subscription:
1.Promises when fulfilled or rejected
2.setTimeout and setInterval when a certain time has elapsed
3Events when the event occurs
*/
/* <p>{deck.cards.length}</p>;*/
  /* {Object.entries(deck).map(([key, value]) => (
               <div key={key}>
               <label>{key}</label>: {JSON.stringify(value)}
               <hr />
               </div>
              ));}
 */