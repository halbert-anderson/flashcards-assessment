import React from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";


function StudyDeckButton(){
const history = useHistory();
const {deckId} =useParams();
return(

<button type="button" className="btn btn-primary mx-2" onClick={() => history.push(`/decks/${deckId}/study`)}>
   Study
</button>
);
}

export default StudyDeckButton;