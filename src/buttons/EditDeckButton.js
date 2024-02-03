import React from "react";
import { useHistory, useParams,useNavigate  } from "react-router-dom/cjs/react-router-dom.min";


function EditDeckButton(){
const history = useHistory();
const {deckId} = useParams();
return(

<button type="button" className="btn btn-secondary mx-2"  onClick={() => history.push(`/decks/${deckId}/edit`)}>
   Edit
</button>
)
}

export default EditDeckButton;