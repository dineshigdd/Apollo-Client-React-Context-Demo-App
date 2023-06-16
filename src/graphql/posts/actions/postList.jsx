import React, { useContext, useEffect, useRef, useState } from 'react'
import {  useLazyQuery } from '@apollo/client';
import { GET_POST } from '../queries/queries';
import UpdatePost from './updatePost'
import listContext from '../context/listContext';

export default function GetAllPosts() {

        const [ updatePost , setUpdatePost ] = useState('');
        let postList = useContext(listContext);
        

        const listItemRef = useRef([]);     
       

        const [ getPost,  { loading, error, data }  ] = useLazyQuery( GET_POST );      
    

        
        useEffect(()=>{       
          console.log( postList)

          if( data ){        
              setUpdatePost(<UpdatePost post={ data.post } item={ listItemRef }/>);        
          }

        },[ data ])                  
    
         //place these return statements after useEffect. 
        //Otherwise there will be an runtime error when submitting the form
        if (loading) return 'Gettting the record...';
        if (error) return `Submission error! ${error.message}`;
  
    return (
        <div>                 
        <ol>                        
            { 
              postList.map( post => <li ref={  el =>listItemRef.current[ post.id ]  = el } key={ post.id }>
                <a href='#'
                 onClick={ ()=>getPost ( { variables: { id : post.id }}) }>{ post.title  }</a>
              </li>) 
              }         
        </ol>
        { updatePost }        
        </div>
    )
}
