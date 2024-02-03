import React from "react";
import {Link} from "react-router-dom";
//import { Breadcrumbs, BreadcrumbsItem } from "react-breadcrumbs-dynamic";
function NavbarCards( {deck, routes}){
 return( 
        <div>
            <nav aria-label="breadcrumb">    
             
                     <Link to={'/'}> Home </Link>
                        <span className="breadcrumb-arrow">&#47;</span>
                     <Link to={`/decks/${deck.id}`}> {deck.name} </Link>
                         <span className="breadcrumb-arrow">&#47;</span>
                     <Link to={"#"}> Study </Link>
                       
            </nav>

        </div>
    );    
}

export default NavbarCards;

//    
        