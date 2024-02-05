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
  const [cardIndex, setCardIndex]=useState(0)
  const {deckId} = useParams();
  const history = useHistory();
//console.log("Study- deckId:", deckId);
//========================================================================
useEffect(() => {
    setDeck({});
    setCards([]);
    const abortController = new AbortController();
    async function loadDeck() {  
       console.log("Study - deckId:", deckId);
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
const handleFlip =  () => {
   setReadFront(current => !current);
};

const handleNext =  () => {
  setReadFront(current => !current);
  setCardIndex(current => current+1);
  
 };

//  const handleRestart = () =>{
//   const result = window.confirm("Restart Cards?\n\n\n Click 'cancel' to return to the home page.");
//   if (result) {
//     setCardIndex(0);}
//   else{
//     // TODO: If not restarting the cards, send the user to the home page.
//     history.push("/");    } 
// }

 
const cardsArray=cards.map((card,index) =>{return(
     <div key={card.id}> 
       <h2>Card {index+1} of {cards.length}</h2>

         { readFront?(<div><p>{card.front}</p>
           <button type="button" className="btn btn-secondary mx-2" onClick={handleFlip}>
              Flip
          </button></div> ):(<div><p>{card.back}</p>

          <button type="button" className="btn btn-secondary mx-2" onClick={handleFlip}>
              Flip
          </button>
          
          <button type="button" className="btn btn-primary mx-2" onClick={handleNext}>
              Next
          </button></div>)}

    </div>
         )})

 /*for (cardIndex;cardIndex< cardsArray.length;setCardIndex(current=>current+1)){
    if(carIndex+1<cardsArray.length){
    <div>cardsArray[cardIndex]</div>
     }else{
     <div>cardsArray[cardIndex]</div>
     <div>
     <button type="button" className="btn btn-secondary mx-2" onClick={handleRestart}>
        restart
     </button></div>
}
*/

 if(deck.id){
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

                {(cardIndex<cardsArray.length)?(cardsArray[cardIndex]):
                 (window.confirm("Restart Cards?\n\n\n Click 'cancel' to return to the home page."))?
                 (setCardIndex(0)):(history.push("/"))    }

                {/* // <button type="button" className="btn btn-secondary mx-2" onClick={handleRestart}>
                    //    restart
                    // </button> 
                 */}

            </div>
  
          )}
  }
  else{ 
  return(<p>Loading...</p>);
  }
  
}

export default Study;

 
   




 /* /*   useEffect(() => {
    
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