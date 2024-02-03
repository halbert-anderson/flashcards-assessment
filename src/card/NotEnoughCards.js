import React from "react";
import {useHistory} from "react-router-dom";

function NotEnoughCards({length,deckId}){
const history =useHistory();
return( <div>
      <h2>Not enough cards.</h2>
      <p>You need at least 3 cards to study. There are {length} cards in this deck.</p>

      <button type="button" className="btn btn-primary mx-2" onClick={() => history.push(`/decks/${deckId}/cards/new`)}>
         Add Cards
      </button>


</div>)

}

export default NotEnoughCards;