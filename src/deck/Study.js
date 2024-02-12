import React, {useState,useEffect} from "react";
import { useParams, useHistory} from "react-router-dom";
import {readDeck} from "../utils/api/index.js"
import NavbarCards from "../card/NavbarCards";
import NotEnoughCards from "../card/NotEnoughCards";

function Study( ){

//========================================================================   

  const [deck, setDeck] = useState({});
  const [cards,setCards]= useState([]);
  const [readFront,setReadFront]=useState(true);
  const [cardIndex, setCardIndex]=useState(0);
  const {deckId} = useParams();
  const history = useHistory();
//console.log("Study- deckId:", deckId);

//========================================================================
 useEffect(() => {
    setDeck({});
    setCards([]);

    const abortController = new AbortController();
   
    async function loadDeck() {  
       // console.log("Study - deckId:", deckId);
       const response = await readDeck(deckId, abortController.signal);
        console.log("Study - RESPONSE:",response);
        console.log("Study - response.cards", response.cards);
       setDeck(response);
       setCards(response.cards);
      }

    loadDeck();
    return () => abortController.abort();

  }, [deckId]);

  //console.log("Study - deck:", deck);
  //console.log("Study - cards:", cards);

//===============================================================================================
const handleFlip =  (event) => {
    // prevent default behavior of button  when clicked 
    event.preventDefault();
    setReadFront(current => !current);
 };

const handleNext =  (event) => {
    // prevent default behavior of button  when clicked 
    event.preventDefault();
    
    setReadFront(current => !current);
    setCardIndex(current => current+1);

    // Upon reaching the end of the deck of cards make a prompr to either study the deck again or quit the deck   
    if(cardIndex+1===cardsArray.length){
    
        const restartDeck = window.confirm("Restart Cards?\n\n\n Click 'cancel' to return to the home page.");
       
        // To start studying the deck from card 1 rest the card index to 0.
        if(restartDeck){ setCardIndex(0)}
        // If not studying the deck again redirect to home page
        else{ history.push("/")}  
    }
 }


 
const cardsArray=cards.map((card,index) =>{return(
     <div key={card.id}> 
       <h2>Card {index+1} of {cards.length}</h2>

         { readFront?(<div><p>{card.front}</p>
           <button type="button" className="btn btn-secondary " onClick={handleFlip}>
              Flip
          </button></div> ):(<div><p>{card.back}</p>

          <button type="button" className="btn btn-secondary " onClick={handleFlip}>
              Flip
          </button>
          
          <button type="button" className="btn btn-primary mx-2" onClick={handleNext}>
              Next
          </button></div>)}

    </div>
         )})

 

if(deck){
    if (cards.length < 3) {
      return(
           <div>
              <NavbarCards deck={deck} />
              <h2>{deck.name}: Study</h2>
              <NotEnoughCards length={cards.length} deckId={deckId} />
           </div>
        );
    }else{
      return(
            <div>
               <NavbarCards deck={deck} />
                       
               <h2>{cardIndex+1 < cards.length ? `Study: ${deck.name}` : `${deck.name}: Study`}</h2>

                {cardsArray[cardIndex]}                

            </div>
  
          )}
  }
 return(<p>Study Loading...</p>);
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
