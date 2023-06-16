import React ,  { useContext, useEffect, useRef, useState }   from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_POST } from '../mutations/mutations'
import listContext from '../context/listContext';
import GetAllPosts from './postList';



export default function CreatePost() {

    const titleRef = useRef();
    const bodyRef = useRef();
    const [ state, setState ] = useState('')
    let postList = useContext(listContext);    

    const [addPost, { data, loading, error  } ] = useMutation( 
            CREATE_POST, { variables:{ input: { title:"Test" , body:"This is a test" }} });
   
    

    useEffect(()=>{
    
        if( data ) {
          let { id, title , body   } = data.createPost;          
          setState( `The Post ID ${ id }  with 
          the title ${ title }  and body ${ body } is added` );
      
          postList.push( data.createPost  );
          setState( <GetAllPosts />)
        }
         
    },[ data ]);
 
   //place these return statements after useEffect. 
   //Otherwise there will be an runtime error when submitting the form
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
    
    const handleSubmit = (e) =>{
      e.preventDefault();

      if( !( titleRef.current.value === ''  && bodyRef.current.value === '' )){
        addPost({ 
          variables: { 
              input: { 
                  title: titleRef.current.value , 
                  body: bodyRef.current.value 
              } 
        }});
      
      }else{
        addPost();
        
      }

    
      
    }
  
    return (
      <div>
        <form 
            onSubmit={ handleSubmit }      
        >
          <input  ref={ titleRef } />
          <input  ref={ bodyRef }  />

          <button type="submit">Submit</button>
        </form>        
        { state  }
       
      </div>
    );
  }
