import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";

export default function DeckDelete({ deckId }) {
const history = useHistory();

function handleDeckDelete() {
const deckDelete = window.confirm(
"Are you sure you want to delete this deck? You will be unable to recover it."
);

if (deckDelete) {
deleteDeck(deckId).then(history.push(`/`)).then(window.location.reload()); //this reloads the page to show that the deck has been deleted.
}
}

return (
<button className="btn btn-danger float-right" onClick={handleDeckDelete}>
Delete
</button>
);
}