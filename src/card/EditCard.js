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
     
     // load the card to be edited and the deck that its from
     const [deck, setDeck] = useState({});
     const [card, setCard] = useState({});

     // using other use hooks
     const history = useHistory();
     const { deckId, cardId } = useParams();
  

//=====================================================================
     //console.log("CARDID:", cardId);
     useEffect(() => {

         setDeck({});
      
         const abortController = new AbortController();
     
         async function loadDeckAndCard() {
           try {
               const loadedDeck =  await readDeck(deckId,abortController.signal);
               //console.log("EditCard - loadedDeck:",loadedDeck);
               setDeck({...loadedDeck});
               //console.log("EditCard - deck:",deck);
             
               const loadedCard = await readCard(cardId, abortController.signal);
               //console.log("EditCard - loadedCard:",loadedCard);
               setCard({...loadedCard});
               //console.log("EditCard - card:",card);


               setFormData({...loadedCard});
               //console.log("EditCard - formData:",formData);
            } 
            catch (err){
               throw err
            }
          }
        loadDeckAndCard();
         
        return () => abortController.abort(); 

      }, [deckId,cardId]);
     
          
    
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
    const handleSubmit = async (event) => {
    
       // prevent default behavior of button when clicked 
       event.preventDefault(); 

     
          try {
              // update a new deck
              const updatedCard = await updateCard(formData);//, abortController.signal);
              //console.log("EditCard - updatedCard:", updatedCard);
              setCard({...updatedCard});

              // setFormData({ ...initialFormState });
              setFormData({...updatedCard});

              // redirect to Deck Screen
              history.push(`/decks/${deckId}`);
                              
          } 
          catch (err) {
            throw err;
          }
  
       
  };
               
    
      const handleCancel = (event) => {
         
              //prevent default behavior of button when clicked 
              event.preventDefault();
                                 
              // reset form to initial state 
              setFormData({ ...initialFormState });
           
              // redirect to Deck Screen
              history.push(`/decks/${deckId}`);
     
              };
          
          
    //==========================================================================================================================================  
    

  if(card.id){
  return (
      <div> 
          
          <nav aria-label="breadcrumb" className="light-gray-background my-2" >
              <Link to={'/'} className="blue-text"><span className="fa-solid fa-house mr-1"></span>
               Home </Link>
                 <span className="breadcrumb-arrow">&#47;</span>
               <Link to={`/decks/${deckId}`}  className="blue-text"> {deck.name} </Link>
                 <span className="breadcrumb-arrow">&#47;</span>
              <Link to={"#"} className="gray-text"> Edit Card {card.id}</Link>
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
                       <button type="button" className="btn btn-secondary " onClick={handleCancel}>Cancel</button>                     
                                       
                       <button type="submit" className="btn btn-primary mx-2" onSubmit={()=>handleSubmit}>Submit</button>                      
                   </td>  
                   
                 </tr>
                 
             </tbody>
               
           </table>
             
         </form>
           
          
       </div> 
      );
    }
    else{ 
      return <p>Edit Card Loading...</p>
    }

  }


   
   

 export default EditCard;
