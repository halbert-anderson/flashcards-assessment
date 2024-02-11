import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {readDeck,deleteDeck, listDecks} from "../utils/api/index.js"
import CardList from "../card/CardList.js";



 function Deck() {

 //===================================================================== 
 //===setting state and using hooks===========================       
      const [deck, setDeck] = useState({});
      const { deckId } = useParams(); 
      const history = useHistory();
 
//==useEffect hook to set state for deck object ==============================

useEffect(() => {

   setDeck({});
      
   const abortController = new AbortController();
   
   async function loadDeck() {   
      try{                     
         const response = await readDeck(deckId, abortController.signal);         
         setDeck(response);
      } 
      catch (err) {
         throw err;
      }
   }

   loadDeck();
   return () => abortController.abort();
 
},[deckId]);
 


//==========================================================================================
//=========click handler for delete button===================

const handleDeckDelete = async (event) => {
    
   // prevent default behavior of button  when clicked 
   event.preventDefault();

   const result = window.confirm("Delete this deck?\n\n\n You will not be able to recover it.");
   if (result) {
     try{     
         // TODO: After the deck is deleted, send the user to the home page.
         await deleteDeck(deckId);
     
         history.push("/");     
      }
     catch(err)
     {
        throw err}
      
   };
   
 };

//==========================================================================================
    
if (deck.id){
   return( 

         <div>
        
            <nav aria-label="breadcrumb" className="light-gray-background my-2" >
           
                  <Link to={'/'} className="blue-text"><span className="fa-solid fa-house mx-2"></span>
                   Home </Link>
                     <span className="breadcrumb-arrow">&#47;</span>
               
                     <Link to={"#"} className="gray-text"> {deck.name} </Link>
               
            </nav>
          
            <div className="card" key={deck.id}>
              <div className="card-body">
                 <div> 
                   <h2>{deck.name}</h2>  
                 </div>
              
                 <div>
                   <p>{deck.description}</p>
                 </div>

                 <div className="d-flex justify-content-between">

                     <div className="flex-item">

                       <button type="button" className="btn btn-secondary mx-2"  onClick={() => history.push(`/decks/${deck.id}/edit`)}>
                       <span className="fa-solid fa-pencil mr-1"></span>  
                       Edit
                       </button>

                       <button type="button" className="btn btn-primary mx-2" onClick={() => history.push(`/decks/${deck.id}/study`)}>
                       <span className="fa-solid fa-book mr-1"></span>  
                       Study
                       </button>

                       <button type="button" className="btn btn-primary mx-2" onClick={() => history.push(`/decks/${deck.id}/cards/new`)}>
                       <span className="fa-solid fa-plus mr-1"></span> 
                       Add Cards
                       </button>

                     </div>

                     <div className="flex-item">

                       <button type="button" className="btn btn-danger mx-2" onClick={handleDeckDelete}>
                       <span className="fa-solid fa-trash-can"></span> 
                       Delete
                       </button>

                     </div>
                 </div>
              </div> 
            </div>
            <h2>Cards</h2>
            {<CardList deck={deck}/>}
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