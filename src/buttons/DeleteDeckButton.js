import React from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import {deleteDeck} from "../utils/api/index";

function DeleteDeckButton(){

const history = useHistory();
const {deckId} = useParams();
  
const handleDelete = async (deckId) => {
    
   const result = window.confirm("Delete this deck? You will not be able to recover it.");
   if (result) {
     await deleteDeck(deckId);
     // TODO: After the deck is deleted, send the user to the home page.
     history.push("/");     
   }
 };

return(

<button type="button" onClick={handleDelete}>
   Delete
</button>
)
}

export default DeleteDeckButton;