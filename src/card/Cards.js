import React from "react";
import { Switch, Route} from "react-router-dom";
import EditCard from "./EditCard";
import AddCard from "./AddCard";
import NotFound from "../Layout/NotFound";



function Cards(){
  
  return(   
         <Switch>
     
              <Route exact path="/decks/:deckId/cards/new">
                    <AddCard />
              </Route>
              
              <Route exact path="/decks/:deckId/cards/:cardId/edit">
                    <EditCard />
              </Route> 
      
              <Route>
                    <NotFound />
              </Route>
             
         </Switch>            
              
    );
}

export default Cards;