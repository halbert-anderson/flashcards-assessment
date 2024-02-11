import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import {createDeck} from "../utils/api/index";

function CreateDeck(){
 

//============================================================================================= 
    //defining the initial state of each form element
    const initialFormState = {
      name: "",
      description: "",
    }

    // set state of all elements of the form 
    const [formData, setFormData] = useState({ ...initialFormState }); 
    const history = useHistory();
   
    
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
// TODO: When the form is submitted, a new Deck should be created, and the form contents cleared.

    const handleSubmit = async (event) => {
    
     // prevent default behavior of button  when clicked 
     event.preventDefault();
          
     //const abortController = new AbortController();

        try {
            //create a new deck
            let newDeck = await createDeck(formData);//, abortController.signal);
          
             // reset form to initial state
            setFormData({ ...newDeck });

             // redirect to Deck Screen
             history.push(`/decks/${newDeck.id}`)
           } 
           catch (err){
            throw err
          }
      
    
          // abortController.abort();
     
};
    
//=============================================================================================
         const handleCancel = (event) => {
    
         // prevent default behavior of button  when clicked 
         event.preventDefault();
                            
         // reset form to initial state
        setFormData({ ...initialFormState });
      
         // redirect to Home Screen
         history.push("/"); 

         };

          
          
//============================================================================================          
        
      // TODO: Add the required input and textarea form elements.
return (
       <div> 
          
         <nav aria-label="breadcrumb" className="light-gray-background my2" >
              <Link to={'/'} className="blue-text"><span className="fa-solid fa-house mx-2"></span>
                 Home </Link>
                 <span className="breadcrumb-arrow">&#47;</span>
              <Link to={"#"} className="gray-text"> Create Deck </Link>
         </nav>
          
          <form name="create" onSubmit={handleSubmit}>
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
                       placeholder="Deck Name" 
                       onChange={handleFormChange} 
                       value={formData.name}
                     />
                  </td>
               </tr>

               <tr>
                  <td>
                    <label htmlFor="description">Description</label>
                    <br/>
                    <textarea 
                         id="description" 
                         name="description" 
                         required={true} 
                         rows={1} 
                         style={{ width: '100%', display: 'block' }}
                         placeholder="Brief description of the deck" 
                         onChange={handleFormChange} 
                         value={formData.description} 
                       />                      
                   </td>
                </tr>
  
                <tr>  
                    <td>
                      <button type="button" className="btn btn-secondary " onClick={handleCancel}>
                        Cancel</button>                     
                                   
                      <button type="submit" className="btn btn-primary mx-2" onSubmit={handleSubmit}>Submit</button>                      
                  </td>  
                  
                </tr>
                
            </tbody>
              
          </table>
            
        </form>
          
       </div> 
      );
    }



 export default CreateDeck;


/*  

createDeck(formData).then(setDecks).catch(setError);
//code for breadcrumbs nav bar
<MDBNavbar expand='lg' light bgColor='light'>
        <MDBContainer fluid>
          <MDBBreadcrumb>
            <MDBBreadcrumbItem>
              <a href='/'>Home</a>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem active>
              <a href='#'>Create Deck</a>
            </MDBBreadcrumbItem>
          </MDBBreadcrumb>
        </MDBContainer>
      </MDBNavbar>
*/