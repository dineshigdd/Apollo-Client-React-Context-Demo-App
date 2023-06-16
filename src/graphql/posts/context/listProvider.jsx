import {  useQuery } from '@apollo/client';
import React   from 'react';
import listContext from './listContext';
import { GET_ALL_POSTS  } from '../queries/queries';

export default function ListProvider({ postLimit, children }) {
 
    const { loading, error, data } = useQuery( 
        GET_ALL_POSTS , 
        { variables: { limit: Number( postLimit) }}
    );

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error : {error.message}</p>;

    return(
        <listContext.Provider value={ [... data.posts.data ]}>
        {children}
      </listContext.Provider>
    );
}