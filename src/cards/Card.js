import React from "react";
import {Switch, Route} from "react-router-dom";
import EditCard from "./EditCard";

function Card(){

    return(

        <Switch>         

            <Route path="/decks/:deckId/cards/:cardId/edit">
                 <EditCard />
            </Route>
        </Switch>
    );
};

export default Card;