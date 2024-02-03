import React from "react";
import {Switch, Route} from "react-router-dom";
import Header from "./Header";
import Home from "../Home";
import CreateDeck from  "../deck/CreateDeck";
import Deck from "../deck/Deck";
import Study from "../deck/Study";
import EditDeck from "../deck/EditDeck";
import EditCard from "../card/EditCard";
import AddCard from "../card/AddCard";
import NotFound from "./NotFound";

function Layout() {
  
  return (
    <div>
      
      <Header />
      
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        
         <Switch>

              <Route exact path="/">
                     <Home />
              </Route>
        
              <Route  path="/decks/new">
                     <CreateDeck />
              </Route>

              <Route exact path="/decks/:deckId"> 
                     <Deck />
              </Route> 

              <Route  path="/decks/:deckId/edit">
                     <EditDeck />
              </Route> 

              <Route  path="/decks/:deckId/study">
                     <Study />
              </Route>

              <Route  path="/decks/:deckId/cards/new">
                     <AddCard />
              </Route>
              
              <Route  path="/decks/:deckId/cards/:cardId/edit">
                    <EditCard />
              </Route>

              <Route>
                    <NotFound />
              </Route>

        </Switch>  
        
      </div>

    </div>
  );
}

export default Layout;
