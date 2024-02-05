import React from "react";
import { useHistory/*useParams,useRouteMatch*/ } from "react-router-dom";
import {deleteDeck} from "../utils/api/index";

function DeleteDeckButton({deckId}){
//const{url}=useRouteMatch();
//const {deckId} = useParams();
  const history = useHistory();  
  console.log("DeleteDeckButton - deckId:", deckId)

  const handleDelete = async (deckId) => {
    
     const result = window.confirm("Delete this deck?\n\n\n You will not be able to recover it.");
        if (result) {
          await deleteDeck(deckId);
          // TODO: After the deck is deleted, send the user to the home page.
          history.push("/");     
      }
   
  };

  return(

      <button type="button" className="btn btn-secondary mx-2 " onClick={handleDelete}>
            <i className="fa-solid fa-trash-can"></i>Delete
      </button>
  )
}

export default DeleteDeckButton;