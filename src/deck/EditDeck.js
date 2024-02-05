import React, {useState,useEffect} from "react";
import { Link, useHistory, useParams} from "react-router-dom";
import { readDeck, updateDeck} from  "../utils/api/index.js";



 function EditDeck( ){

    // defining the initial state of each form element
    const initialFormState = {
      name: "",
      description: "",
       };

    // set state of all elements of the form 
    const [formData, setFormData] = useState({ ...initialFormState });
    const history = useHistory();
    

     // load the deck to be edited
     const [deck, setDeck] = useState({});
     const {deckId} = useParams();

//=====================================================================
    
       useEffect(() => {
         setDeck({});
         const abortCon = new AbortController();
     
         async function loadDeck() {
           try {
             const loadedDeck =  await readDeck(deckId);
             console.log("EditDeck - loadedDeck:", loadedDeck);
             setDeck(loadedDeck);
           } catch (err) {throw err}
         }
         loadDeck();
         return abortCon.abort();
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
    

    // TODO: When the form is submitted, a Deck should be update, and the form contents cleared.
    const handleSubmit = (event) => {
    
       // prevent default behavior of button when clicked 
       event.preventDefault();
          
       const abortCon = new AbortController();
  
       async function editDeck() {
          try {
              // update a new deck
              await updateDeck(formData);
          
              // reset form to initial state
              setFormData({ ...initialFormState });
          } 
          catch (err) {
              throw err
            }
        }

        editDeck();

        abortCon.abort();

        // redirect to Deck Screen
        history.push(`decks/${deckId}`)
    };
        

    const handleCancel = (event) => {
    
       // prevent default behavior of button  when clicked 
       event.preventDefault();
                            
       // reset form to initial state
       setFormData({ ...initialFormState });
      
       // redirect to the Deck Screen
       history.push(`/decks/${deckId}`); 
    
    };

             
  // TODO: Add the required input and textarea form elements.
  return (
      <div>         
         <nav aria-label="breadcrumb">
              <Link to={'/'}> Home </Link>
                 <span className="breadcrumb-arrow">&#47;</span>
              <Link to={`/decks/${deckId}`}> {deck.name} </Link>
                 <span className="breadcrumb-arrow">&#47;</span>
              {/* <Link to="#"> Edit Deck </Link> */}
              <p> Edit Deck </p>
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
                      <button type="button" className="btn btn-secondary mx-2" onClick={handleCancel}>Cancel</button>                     
                                      
                      <button type="submit" className="btn btn-primary mx-2" onSubmit={handleSubmit}>Submit</button>                      
                    </td>  
                </tr>              
            </tbody>              
          </table>            
        </form>          
       </div> 
      );
    }




   
   

 export default EditDeck;
