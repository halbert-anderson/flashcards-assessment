import React from "react";
import CreateDeckButton from "./buttons/CreateDeckButton";
import DeckList from "./deck/DeckList";



export default function Home() {

//===============================================================================

   
  return (
     <div className="d-flex flex-column">
        <div className="mb-2">
          <CreateDeckButton />
        </div>

        <div>
          <DeckList />
        </div>
    </div>
  );
  }
 

 