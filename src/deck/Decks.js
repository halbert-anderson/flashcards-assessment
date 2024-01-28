import React, {useState, useEffect}  from "react";
import {Switch, Route} from "react-router-dom";
import {readDeck, listDecks}  from "../utils/api/index.js";
import DeleteDeckButton from "../buttons/DeleteDeckButton.js";
import StudyButton from "../buttons/StudyButton.js";
import ViewButton from "../buttons/ViewButton.js";
import CreateDeck from "./CreateDeck.js";
import Deck from  "./Deck.js";

function Decks(){
   const [decks, setDecks] = useState([])
   useEffect(() => {
    
      setDecks([]);
      
      const abortController = new AbortController();
      
      async function loadDecks(){
      
          try{
             const response =  listDecks(abortController.signal);
 
             const allDecks = await response;//.json();
 
             setDecks(allDecks);
             
            } 
          catch (error) {
             if (error.name !== "AbortError") {
               console.error(error);
              }
            }     
       }

       loadDecks();

       return () => {
           abortController.abort(); // cancels any pending request or response
        };

     }, []);
    console.log(decks);
  
  /*<p>{deck.cards.length}</p>;*/
       const decksInfo = decks.map((deck, index) =>{
       return(
       <article className="col-12 col-md-6 col-xl-3 my-2 align-self-stretch">
         
           <div className="flex-row">
               
               <div className="flex-column">
                  <h1>{deck.name}</h1>               
                  <p>{deck.cards.length}</p>
               </div>
              
                <div >
                   <p>{deck.description}</p>               
                </div>
             
                <div>
                 <ViewButton />
                 <StudyButton />
                 <DeleteDeckButton />
               </div>
          </div>
       </article>)
             }
             
          ) ;
    
    

    return( 
        <div>
          {decksInfo}
          <Switch>
               <Route path="/decks/new">
                    <CreateDeck />
               </Route>
      
               <Route path="/decks/:deckId">
                     <Deck />
               </Route>  
          </Switch>
        </div>
         );
    };

export default Decks;
/*
import React, { useEffect, useState } from "react";
import Deck from "./Deck";
import {listDecks} from "../utils/api/index";

export const Decks = () => {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();
    try{
    const response = listDecks(abortController.signal).then(setUsers).catch(setError);
      const allDecks = await response.json();
      setDecks(allDecks);
    }
    catch(error) { 
        if (error.name !== "AbortError") {
        console.error(error);
       }
      }    
    return () => abortController.abort();
  }, []);

 

  const deckList = decks.map((deck) => <Deck deckId={deck.id} deck={deck} />);

  return (
    <div>
      <main className="container">
         <section className="row">{deckList}</section>
      </main>
      <Switch>
               <Route path="/decks/new">
                    <CreateDeck />
               </Route>
      
               <Route path="/decks/:deckId">
                     <Deck />
               </Route>  
      </Switch>
    </div>
  );
};


export default Decks;
*/
/*  
return(
                <tr key={index}>
                  
                  <tr>
                     <td>{deck.name}</td>
                     <td>{deck.cards.length}</td>  
                  /</tr>
                  
                  <tr>
                     <td>{deck.description}</td>             
                  </tr>

                  <tr>
                     <td><ViewButton /></td>

                     <td><StudyButton/></td>
   
                     <td><DeleteDeckButton /></td>
                  </tr>

                </tr>  
                      
               )
*/