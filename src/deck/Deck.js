import React, {useState, useEffect} from "react";
import {Link, useHistory,/*useRouteMatch,*/ useParams} from "react-router-dom";
import {readDeck,deleteDeck} from "../utils/api/index.js"
// import Study from "./Study";
// import EditDeck from "./EditDeck";
// import Cards from "../card/Cards"
 import CardList from "../card/CardList.js";
// import NotFound from "../Layout/NotFound.js";

 function Deck(){

 //===================================================================== 
 //set state and using hooks       
      const [deck, setDeck] = useState({});
      const [cards,setCards] =useState([]);
      const {deckId} = useParams(); 
      const history = useHistory();
  //  const {path}= useRouteMatch();

 //=================================================================================
 useEffect(() => {
   const abortController = new AbortController();
   async function loadDeck() {  
      console.log("Deck - deckId:", deckId);
     const response = await readDeck(deckId, abortController.signal);

     console.log("Deck - RESPONSE:",response)
     setDeck(response);
  //   console.log("DdeCKk",deck)
     setCards(response.cards);
   }
   
   loadDeck();
  // console.log("DECK",deck)
   return () => abortController.abort();
 }, [deckId]);
 
 console.log("Deck - deck:",deck)
//==========================================================================================
const handleDelete = async (deckId) => {
    
   const result = window.confirm("Delete this deck?\n\n\n You will not be able to recover it.");
   if (result) {
     await deleteDeck(deckId);
     // TODO: After the deck is deleted, send the user to the home page.
     history.push("/");     
   }
   
 };
//==========================================================================================
    console.log("Deck - deck.cards:",deck.cards);
    
    console.log("Deck - cards:", cards);

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

                     <button type="button" className="btn btn-secondary mx-2"  onClick={() => history.push(`/decks/${deck.id}/edit`)}>
                        Edit
                     </button>

                     <button type="button" className="btn btn-primary mx-2" onClick={() => history.push(`/decks/${deck.id}/study`)}>
                          Study
                     </button>

                     <button type="button" className="btn btn-primary mx-2" onClick={() => history.push(`/decks/${deck.id}/cards/new`)}>
                           Add Cards
                     </button>
                  </div>

                  <div className="flex-item">
                     <button type="button" className="btn  btn-danger mx-2 fa-solid fa-trash-can" onClick={handleDelete(deck.id)}>
                      <i className="fa-solid fa-trash-can"></i>Delete
                     </button>
                  </div>
                </div>
              </div> 
           </div>
            <h2>Cards</h2>
            {cards}
           <CardList cards={cards} />    
           
      </div> 
      
    );
    
  }
  
 

 export default Deck;
/*
 <Switch>
            
             <Route exact path="/decks/:deckId/study">
               <Study />
            </Route> 
              
             <Route path="/decks/:deckId/edit">
               <EditDeck />
            </Route> 
          
             <Route path="/decks/:deckId/cards">
                 <Cards  />
            </Route> 
           
            <Route>
                    <NotFound />
              </Route>
    
        </Switch>

*/


 /*
 useEffect(() => {
     
       setDeck({});
       
       const abortController = new AbortController();
       
       async function loadDeck(){
       
           try{
              const newDeck = await readDeck(deckId,abortController.signal);
  
              //const newDeck = await response;//.json();
              //console.log("Deck - newDeck:",newDeck);
              console.log("Deck - newDeck:",newDeck);
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
 */

/*
<article className="col-12 col-md-6 col-xl-3 my-2 align-self-stretch">
 </article>

 <Route exact path="/decks/:deckId/study">
 <Study />
</Route>
*/
/*if (deck.id) {
     return( <div>
 
              <h1>{deck.name}</h1>
              <p>{deck.description}</p>

              
              <Switch>
                
                <Route path=`${path}/study`>
                     <Study />
                </Route>
                <Route path=`${path}/edit`>
                   <EditDeck />
                </Route>
                <Route path=`${path}/cards`>
                  <Cards />
                </Route>
              </Switch>
            </div>);
    }
   return "Loading...";
*/
/* <p>{deck.cards.length}</p>;*/
  /* {Object.entries(deck).map(([key, value]) => (
               <div key={key}>
               <label>{key}</label>: {JSON.stringify(value)}
               <hr />
               </div>
              ));}
 */