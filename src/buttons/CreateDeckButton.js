import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function CreateDeckButton(){
const history = useHistory();

return(
<button type="button" className="btn btn-secondary mx-2" onClick={() => history.push("/decks/new")}>
   Create Deck
</button>
)

}

export default CreateDeckButton;