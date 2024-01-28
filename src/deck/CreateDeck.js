import React, {useState} from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import {createDeck} from "../utils/api/index";

 function CreateDeck(){
 

    //defining the initial state of each form element
    const initialFormState = {
      name: "",
      description: "",
       };
    
    // set state of all elements of the form 
    const [formData, setFormData] = useState({ ...initialFormState });
   
    const history = useHistory();
   
    const {path} = useRouteMatch();
    
    // TODO: Add the required submit and change handlers
    // define how to handle changes of form elements
    const handleFormChange = ({ target }) => {
            setFormData({
                ...formData,
                  [target.name]: target.value,
            });
    
          };
    
    // TODO: When the form is submitted, a new Deck should be created, and the form contents cleared.
        const handleSubmit = (event) => {
    
        // prevent default behavior of button  when clicked 
        event.preventDefault();
          
      const abortCon = new AbortController();

    async function loadDecks() {
      try {
        // create a new deck
         await createDeck(formData);
          
        // reset form to initial state
        setFormData({ ...initialFormState });
     } catch (err) {throw err}
    }
          loadDecks();
          abortCon.abort();
         // redirect to Deck Screen
         history.push("{path}/newDeck.id")
        };
    
         const handleCancel = (event) => {
    
          // prevent default behavior of button  when clicked 
         event.preventDefault();
                            
         // reset form to initial state
         setFormData({ ...initialFormState });
      
          // redirect to Home Screen
           history.push("/"); 
         };

          
          
          
      
      
      // TODO: Add the required input and textarea form elements.
      return (
      <div> 
          
         <nav aria-label="breadcrumb">
              <Link to={'/'}> Home </Link>
                 <span className="breadcrumb-arrow">&#47;</span>
              <a> Create Deck </a>
         </nav>
          
          <form name="create" onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td> 
                    <label for="name">Name                       
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
                    <label for="description">Description</label>
                    <br/>
                    <textarea 
                         id="description" 
                         name="description" 
                         required={true} 
                         rows={1} 
                         placeholder="Breif description of the deck" 
                         onChange={handleFormChange} 
                         value={formData.description} 
                       />                      
                   </td>
                </tr>
  
                <tr>  
                    <td>
                      <button type="button" onClick={handleCancel}>Cancel</button>                     
                   </td>
    
                   <td>                     
                      <button type="submit" onSubmit=          {handleSubmit}>Submit</button>                      
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