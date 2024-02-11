import React from "react";
import {Link} from "react-router-dom";
//import { Breadcrumbs, BreadcrumbsItem } from "react-breadcrumbs-dynamic";

function NavbarCards( {deck, routes}){
 return( 
    <div>
    <nav aria-label="breadcrumb" className="light-gray-background my-2" >
      <Link to={'/'}><span className="fa-solid fa-house mr-1"></span>  Home </Link>
      <span className="breadcrumb-arrow">&#47;</span>
      <Link to={`/decks/${deck.id}`}> {deck.name} </Link>
      <span className="breadcrumb-arrow">&#47;</span>
      <Link to={"#"} className="gray-text"> Study </Link>
    </nav>
  </div>
    );    
}
//exported to study component
export default NavbarCards;

 
        