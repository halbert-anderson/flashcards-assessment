import React, {useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import {readDeck} from "../utils/api/index.js"

function Study(){
    
  const [deck, setDeck] = useState({});
  const {deckId} =useParams();

    useEffect(() => {
    
      setDeck({});
      
      const abortController = new AbortController();
      
      async function loadDeck(){
      
          try{
             const response = readDeck(deckId,abortController);
 
             const newDeck = await response.json();
              console.log(newDeck);
             setDeck(newDeck);
            } 
          catch (error) {
             if (error.name !== "AbortError") {
               console.error(error);
              }
            }     
       }

       loadDeck();

       return () => {
           abortController.abort(); // cancels any pending request or response
        };

     }, [deckId]);

  

 
    return( 
      <div>
           <nav aria-label="breadcrumb">    
             
             <Link to={'/'}>Home</Link>
                <span className="breadcrumb-arrow">&#47;</span>
             <Link to={'/decks/:deckId'}>{deck.name}</Link>
                <span className="breadcrumb-arrow">&#47;</span>
             <Link to={""}>Study</Link>
                  
           </nav>

           <h1>`Study: ${deck.name}`</h1>

             {Object.entries(deck).map(([key, value]) =>{return(
              <div key={key}>
              <label>{key}</label>: {JSON.stringify(value)}
              <hr />
              </div>
             )})}

      </div>);
   }
  

 export default Study;

/*
if (deck.id) {
    return Object.entries(deck).map(([key, value]) => (
      <div key={key}>
        <label>{key}</label>: {JSON.stringify(value)}
        <hr />
      </div>
    ));
  }
  return "Loading...";
*/
/*
 for(let cardNumber=0; cardNumber<deck.cards.length; cardNumber++){


 }*/