import React, {useState,useEffect} from "react";
import { Link, useHistory, useParams} from "react-router-dom";
import { readDeck, updateDeck} from  "../utils/api/index.js";



 function EditDeck( ){
   
   // defining the initial state of each form element
   const initialFormState = {
    name: "",
    description: "",
     };


    // load the deck to be edited
    const [deck, setDeck] = useState({});
    const {deckId} = useParams();
  

    // set state of all elements of the form 
    const [formData, setFormData] = useState({ ...initialFormState });
    const history = useHistory();

   

//=====================================================================
    
       useEffect(() => {

         setDeck({});
        
         const abortController = new AbortController();
     
         async function loadDeck() {
           try {
             //console.log("EditDeck - deckId:", deckId);
             const loadedDeck =  await readDeck(deckId, abortController.signal);
             //console.log("EditDeck - loadedDeck:", loadedDeck);
             setDeck({...loadedDeck});
             //console.log("DECK:",deck);
             setFormData({...loadedDeck});
             //console.log("FORMDATA:",formData);
           } 
           catch (err){
            throw err
           }
         }

         loadDeck();
        
         return () => abortController.abort();

       }, [deckId]);
     

       
    
//=================================================================================   
    // TODO: Add the required submit and change handlers
    // define how to handle changes of form elements
    const handleFormChange = ({ target }) => {
            setFormData({
                ...formData,
                  [target.name]: target.value,
            });
    
          };
    

    // When the form is submitted, deck is updated, and the form contents cleared.
    const handleSubmit = async (event) => {
    
       // prevent default behavior of button when clicked 
       event.preventDefault();
                  
       // console.log("EditDeck - id:", id);
          try {
              // update a new deck
              const updatedDeck = await updateDeck({...formData});;
              
              setDeck({...updatedDeck});
                           
              // reset form to initial state
              setFormData({...updatedDeck});
             
              // redirect to Deck Screen
              history.push(`/decks/${deckId}`)
              // window.location.reload();
          } 
          catch (err) {
              throw err
            }
  
                      
    };
        

    const handleCancel = (event) => {
    
       // prevent default behavior of button  when clicked 
       event.preventDefault();
                            
       // reset form to initial state
       setFormData({ ...initialFormState });
      
       // redirect to the Deck Screen
       history.push(`/decks/${deckId}`); 
      // window.location.reload();
    };

  if(deck.id){        

  // TODO: Add the required input and textarea form elements.
  return (
      <div>         
         <nav aria-label="breadcrumb" className="light-gray-background my-2" >
              <Link to={'/'}  className="blue-text"><span className="fa-solid fa-house mr-1"></span>
               Home </Link>
                 <span className="breadcrumb-arrow">&#47;</span>
              <Link to={`/decks/${deckId}`}  className="blue-text"> {deck.name} </Link>
                 <span className="breadcrumb-arrow">&#47;</span>
                 <Link to={"#"} className="gray-text">Edit Deck </Link> 
              
         </nav>
         <h2>Edit Deck</h2>
         <form name="update" onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="name">Name
                    </label>
                    <br/>
                    <input 
                       id="name" 
                       name="name" 
                       type="text" 
                       required={true} 
                       placeholder= {deck.name} 
                       onChange={handleFormChange} 
                       value={formData.name}
                     />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor="description">Description
                    </label>
                    <br/>
                    <textarea 
                         id="description" 
                         name="description" 
                         required={true} 
                         rows={1} 
                         placeholder={deck.description} 
                         onChange={handleFormChange} 
                         value={formData.description} 
                       />                      
                  </td>
                </tr>
  
                <tr>  
                  <td>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>                     
                                      
                    <button type="submit" className="btn btn-primary mx-2" onSubmit={()=>handleSubmit()}>Submit</button>                      
                  </td>  
                </tr>              
            </tbody>              
          </table>            
        </form>          
       </div> 
      );
  }

  return <p>Edit Deck Loading...</p>;
}
 export default EditDeck;
