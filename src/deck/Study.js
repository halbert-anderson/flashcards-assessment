import React, {useState,useEffect} from "react";
import { useParams} from "react-router-dom";
import {readDeck} from "../utils/api/index.js"
import NavbarCards from "../card/NavbarCards";
import NotEnoughCards from "../card/NotEnoughCards";

function Study( ){

//========================================================================   

  const [deck, setDeck] = useState({});
  const [cards,setCards]= useState([]);
  const {deckId} =useParams();
console.log("Study- deckId:", deckId);
//========================================================================
useEffect(() => {
  const abortController = new AbortController();
  async function loadDeck() {
    const response = await readDeck(deckId, abortController.signal);
    setDeck(response);
    setCards(response.cards);
  }

  loadDeck();
  console.log("Study - deck:", deck);
  console.log("Study - cards:", cards);
  return () => abortController.abort();
}, []);

let readFront =true;
//console.log("Study - deck:", deck);
//console.log("Study - cards:", cards);

//===============================================================================================
const handleFlip =  () => {
   readFront=false;
  
};

const handleNext =  () => {
  readFront=false;
 
};



 if (cards.length < 3) {
    return (
      <div>
        <NavbarCards deck={deck} />
        <h2>{deck.name}: Study</h2>
        <NotEnoughCards length={cards.length} deckId={deckId} />
      </div>
    );
  }
    return( 
      <div>
        
         <NavbarCards deck={deck} />

         <h1>Study: {deck.name}</h1>

             {cards.map(card =>{return(
              <div key={card.id}>{
                 readFront?(<div><p>card.front</p></div> ):(<div><p>card.back</p>
                 <button type="button" className="btn btn-secondary mx-2" onClick={handleNext}>
                  Next
               </button></div>)}
              <button type="button" className="btn btn-secondary mx-2" onClick={handleFlip}>
                  Flip
               </button>
              </div>
             )})}

      </div>);
   }
  

 export default Study;



 /*   useEffect(() => {
    
      setDeck({});
      
      const abortController = new AbortController();
      
      async function loadDeck(){
      
          try{
             const response = await readDeck(deckId,abortController);
             //const newDeck = await response.json();
             //console.log(newDeck);
             setDeck(response);
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

  */
 /*
<nav aria-label="breadcrumb">    
             
             <Link to={'/'}>Home</Link>
                <span className="breadcrumb-arrow">&#47;</span>
             <Link to={'/decks/:deckId'}>{deck.name}</Link>
                <span className="breadcrumb-arrow">&#47;</span>
             <Link to={""}>Study</Link>
                  
           </nav>

 */

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