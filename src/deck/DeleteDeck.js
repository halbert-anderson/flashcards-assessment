import React from "react";

 function DeleteDeck(){
    if (window.confirm("Delete this deck?"
    
                       " You will not be able to recover it")) {
        window.open("exit.html", "Thanks for Visiting!");
      }
 }  

 

 export default DeleteDeck;
