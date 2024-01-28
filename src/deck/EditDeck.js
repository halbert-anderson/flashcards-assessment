import React from "react";
import { useParams } from "react-router-dom";
import {readDeck, readCard} from  "../utils/api/index.js";



 function EditDeck(){
   const { deckId, cardId } = useParams();
   
   if (!cardId) {
    throw new Error("No URL parameter for cardId");
  }
   
   
   return null;
 }

 export default EditDeck;
