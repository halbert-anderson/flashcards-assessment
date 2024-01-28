import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function ViewButton(){
const history = useHistory();

return(

<button type="button" onClick={() => history.push("/decks/:deckId")}>
   View
</button>
)
}

export default ViewButton;