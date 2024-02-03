import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function ViewDeckButton(deckId){
const history = useHistory();
console.log("ViewDeckButton - deckId:" ,deckId);

return(

<button type="button" className="btn btn-secondary mx-2" onClick={() => history.push("/decks/:deckId")}>
   View
</button>
)
}

export default ViewDeckButton;