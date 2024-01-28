import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function CreateDeckButton(){
const history = useHistory();

return(

<button type="button" onClick={() => history.push("/decks/new")}>
   Create Deck
</button>
)
}

export default CreateDeckButton;