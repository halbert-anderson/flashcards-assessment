import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function EditButton(){
const history = useHistory();

return(

<button type="button" onClick={() => history.push("/decks/:deckId/edit")}>
   Edit
</button>
)
}

export default EditButton;