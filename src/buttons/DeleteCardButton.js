import React from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import {deleteCard} from "../utils/api/index";

function DeleteCardButton(){

const history = useHistory();
const {cardId} = useParams();
  
const handleDelete = async (cardId) => {
    
   const result = window.confirm("Delete this card? You will not be able to recover it.");
   if (result) {
     await deleteCard(cardId);
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