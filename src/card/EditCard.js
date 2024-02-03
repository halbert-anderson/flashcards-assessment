import React, {useState,useEffect} from "react";
import { Link, useHistory, useParams} from "react-router-dom";
import { readDeck, readCard, updateCard } from  "../utils/api/index.js";



 function EditCard( ){

    //defining the initial state of each form element
    const initialFormState = {
      front: "",
      back: "",
       };
       
     // set state of all elements of the form 
     const [formData, setFormData] = useState({ ...initialFormState });
     const history = useHistory();
     const {deckId,cardId} = useParams();

     // load the card to be edited
     const [deck, setDeck] = useState({});
     const [card, setCard] = useState({});
    

//=====================================================================
   
       useEffect(() => {
         const abortCon = new AbortController();
     
         async function loadDeck() {
           try {
             const loadedDeck =  await readDeck(deckId);
             setDeck(loadedDeck);
           } catch (err) {throw err}
         }
         loadDeck();
         return abortCon.abort();
       }, [deckId]);
     

       useEffect(() => {
        const abortController = new AbortController();
        async function loadCard() {
          try{const response = await readCard(cardId, abortController.signal);
          setCard(response);
      }catch (err) {throw err}
    }
        loadCard();
        return () => abortController.abort();
      }, [cardId]);

       
    
//=================================================================================   
    // TODO: Add the required submit and change handlers
    // define how to handle changes of form elements
    const handleFormChange = ({ target }) => {
            setFormData({
                ...formData,
                  [target.name]: target.value,
            });
    
          };
    
 //=============================================================================================
    // TODO: When the form is submitted, a Deck should be update, and the form contents cleared.
    const handleSubmit = (event) => {
    
       // prevent default behavior of button  when clicked 
       event.preventDefault();
          
       const abortCon = new AbortController();
  
       async function editCard() {
          try {
              // update a new deck
              await updateCard(formData);
          
              // reset form to initial state
              setFormData({ ...initialFormState });
          } 
          catch (err) {
            throw err}
        }

          editCard();

          abortCon.abort();

         // redirect to Deck Screen
         history.push(`/deck/${deckId}`);
  };
               
    
      const handleDone = (event) => {
         
              // prevent default behavior of button  when clicked 
              event.preventDefault();
                                 
              // reset form to initial state
              setFormData({ ...initialFormState });
           
              // redirect to Deck Screen
              history.push(`/deck/${deckId}`);
     
              };
          
          
    //==========================================================================================================================================  
    

      return (
      <div> 
          
         <nav aria-label="breadcrumb">
              <Link to={'/'}> Home </Link>
                 <span className="breadcrumb-arrow">&#47;</span>
              <Link to={'/decks/:deckId'}> {deck.name} </Link>
                 <span className="breadcrumb-arrow">&#47;</span>
              <Link to="#"> Edit Card {card.id}</Link>
         </nav>

         <h2>Edit Card</h2>
        
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
                          placeholder={card.front} 
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
                          placeholder={card.back}
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




   
   

 export default EditCard;
