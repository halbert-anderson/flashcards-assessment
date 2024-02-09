import React, {useState, useEffect} from "react";
import { Link, useParams, useHistory} from "react-router-dom";
import {createCard, readDeck} from "../utils/api/index";

 
 function AddCard(){
  
 
 //============================================================================================= 
     //defining the initial state of each form element
     const initialFormState = {
       front: "",
       back: "",
     }
 
     // set state of all elements of the form 
     const [formData, setFormData] = useState({ ...initialFormState });
     const [deck, setDeck] = useState({});
    // const [cards, setCards] =useState([]);
     const {deckId} = useParams();
     const history = useHistory();
    
 //=================================================================================================

     useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck() {
          const response = await readDeck(deckId, abortController.signal);
          setDeck(response);
          //setCards(response.cards);
        }
      
        loadDeck();
        return () => abortController.abort();
      }, [deckId]);
      

     
 //==============================================================================================
     // TODO: Add the required submit and change handlers
     // define how to handle changes of form elements
     const handleFormChange = ({ target }) => {
             setFormData({
                 ...formData,
                   [target.name]: target.value,
             });
     
           };
     
 
 
 //==============================================================================================
 // TODO: When the form is submitted, a new Card should be created, and the form contents cleared.
 
     const handleSubmit = async (event) => {
     
      // prevent default behavior of button  when clicked 
      event.preventDefault();
           
      const abortCon = new AbortController();
 
         try {
              // create a new deck
              await createCard(deckId,formData,abortCon.signal);
           
              // reset form to initial state
             setFormData({ ...initialFormState });
            } 
            catch (err){
             throw err
           }
           abortCon.abort();
         }
          
       
      

     
 //=============================================================================================
          const handleDone = (event) => {
     
          // prevent default behavior of button  when clicked 
          event.preventDefault();
                             
          // reset form to initial state
          setFormData({ ...initialFormState });
       
          // redirect to Deck Screen
          history.push(`/decks/${deckId}`);

          };
 
           
           
 //============================================================================================          
         
       // TODO: Add the required input and textarea form elements.
if(deck.id){
     return (
        <div> 
           
           <nav aria-label="breadcrumb">
               <Link to={'/'}> Home </Link>
                  <span className="breadcrumb-arrow">&#47;</span>
               <Link to={`/decks/${deck.id}`}> {deck.name} </Link>
                   <span className="breadcrumb-arrow">&#47;</span>
               <Link to={"#"}> Add Card </Link>
           </nav>

           <h2>{deck.name}: Add Card</h2>

           <form name="create" onSubmit={handleSubmit}>
             <table>
               <tbody>                 
                <tr>
                   <td>
                     <label htmlFor="front">Front</label>
                     <br/>
                     <textarea 
                          id="front" 
                          name="front" 
                          required={true} 
                          rows={1} 
                          placeholder="Front side of card" 
                          onChange={handleFormChange} 
                          value={formData.front} 
                        />                      
                    </td>
                 </tr>

                <tr>
                   <td>
                     <label htmlFor="back">Back</label>
                     <br/>
                     <textarea 
                          id="back" 
                          name="back" 
                          required={true} 
                          rows={1} 
                          placeholder="Back side of card" 
                          onChange={handleFormChange} 
                          value={formData.back} 
                        />                      
                    </td>
                 </tr>
   
                 <tr>  
                     <td>
                       <button type="button" className="btn btn-secondary mx-2" onClick={handleDone}>Done</button>                     
                    </td>
     
                    <td>                     
                       <button type="submit" className="btn btn-primary mx-2" onSubmit={handleSubmit}>Save</button>                      
                   </td>  
                   
                 </tr>
                 
             </tbody>
               
           </table>
             
         </form>
           
        </div> 
       );
     }
  return(<p>Loading...</p>)
    }

  export default AddCard;
 
 
 