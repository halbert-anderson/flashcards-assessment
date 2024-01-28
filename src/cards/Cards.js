import React from "react";

function Cards(){

    return(
        <Switch>
             <Route path="/decks/:deckId/cards/new">
                  <AddCard />
             </Route>
             <Route path="/decks/:deckId/cards/:cardId/edit">
                  <EditCard />
            </Route>    
        </Switch>
    )
}
export default Cards;