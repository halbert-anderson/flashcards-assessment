import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function AddCardsButton(){
const history = useHistory();

return(

<button type="button" onClick={() => history.push("/decks/:deckId/cards/new).")}>
   Add Cards
</button>
)
}

export default AddCardsButton;