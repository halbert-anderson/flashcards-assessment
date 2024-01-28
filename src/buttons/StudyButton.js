import React from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";


function StudyButton(){
const history = useHistory();
const {deckId} =useParams();
return(

<button type="button" onClick={() => history.push(`/decks/${deckId}/study`)}>
   Study
</button>
);
}

export default StudyButton;