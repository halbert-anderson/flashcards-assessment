import React, {useState, useEffect} from "react";
import {Switch, Route,Link, useRouteMatch, useParams} from "react-router-dom";
import CreateDeckButton from "../buttons/CreateDeckButton";
import StudyButton from "../buttons/StudyButton";
import AddCardsButton from "../buttons/AddCardsButton";
import DeleteDeckButton from "../buttons/DeleteDeckButton";
import EditDeck from "./EditDeck";
import Study from "./Study";
import Cards from "../cards/Cards"
import {readDeck} from "../utils/api/index.js"
import EditButton from "../buttons/EditButton";
import AddCard from "../cards/AddCard";
import EditCard from "../cards/EditCard";

 function Deck(){
         
   const [deck, setDeck] = useState({});
   const {deckId} = useParams(); 
   const {path}= useRouteMatch();
   
      useEffect(() => {
     
       setDeck({});
       
       const abortController = new AbortController();
       
       async function loadDeck(){
       
           try{
              const response = await readDeck(deckId,abortController.signal);
  
              const newDeck = await response;//.json();
              console.log(`Deck.js - ${newDeck}`);
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
 
    console.log(deck)
     
     
     return( 

       <div>
         
            <nav aria-label="breadcrumb">
           
                  <Link to={'/'}> Home </Link>
                  
                  <span className="breadcrumb-arrow">&#47;</span>
                  
                  <a>{deck.name} </a>
               
            </nav>
          
            <article className="col-12 col-md-6 col-xl-3 my-2 align-self-stretch">
            <div>
          
                <div className="flex-row">
                   <h1>{deck.name}</h1>  
                </div>
              
                <div>
                   <p>{deck.description}</p>
                </div>
              
                <div>
                   <EditButton />
                   <StudyButton />
                   <AddCardsButton />
                   <DeleteDeckButton />
                </div>
           
             </div>
             </article>
       
        <Switch>
                
                <Route path="{path}/study">
                     <Study />
                </Route>
                <Route path="{path}/edit">
                   <EditDeck />
                </Route>
                <Route path="{path}/cards/new">
                  <AddCard />
                </Route>
          
                <Route path="{path}/cards/:cardId/edit">
                  <EditCard />
                </Route>
              </Switch>
      
      </div> 
     );
    }
  
 

 export default Deck;
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