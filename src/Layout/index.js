import React from "react";
import {Switch, Route} from "react-router-dom";
import Header from "./Header";
import Home from "../Home";
import CreateDeck from  "../deck/CreateDeck";
import Study from "../deck/Study";
import Deck from "../deck/Deck";
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
          
            <Route exact path="/decks/new">
                <CreateDeck />  
             </Route>
          
             <Route path="/decks/:deckId">
                <Deck />
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
