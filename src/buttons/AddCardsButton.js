import React from "react";
import { useHistory,useParams } from "react-router-dom/cjs/react-router-dom.min";


function AddCardsButton(){
const history = useHistory();
const {deckId} =useParams();
return(

<button type="button" className="btn btn-primary mx-2" onClick={() => history.push(`/decks/${deckId}/cards/new`)}>
   Add Cards
</button>
)
}

export default AddCardsButton;