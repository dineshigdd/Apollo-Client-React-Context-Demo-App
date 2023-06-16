// Import everything needed to use the `useQuery` hook

import { useRef, useState } from 'react';
import GetAllPosts from './graphql/posts/actions/postList';
import CreatePost  from './graphql/posts/actions/createPost'
import ListProvider from './graphql/posts/context/listProvider';



export default function App() {
  const inputRef = useRef('');
  const [ state, setState ] = useState();
  const [ postLimit, setPostLimit ] = useState(0);



  const getPostLimit = () =>{   
    console.log( postLimit)
    setState( 
    <ListProvider postLimit={ postLimit }>
      <GetAllPosts />
    </ListProvider>);
    inputRef.current.value = '';
  }




  return (
    
    <div>
      <h2>All posts</h2>
      <label>Number of post: </label>
      <input onChange={ ( event )=> setPostLimit( event.target.value )} placeholder="Enter number of post" ref={ inputRef } type='text'/>
      <button onClick={ getPostLimit }>Submit</button>      

      
      <h2>Add new posts</h2>
        <button onClick={()=>setState(
             <ListProvider postLimit={ postLimit }><CreatePost /></ListProvider> 
        )}>Add new</button>
      
   
      { state }
       
     
      
    </div>
  
  );
}