import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import { itemsActions } from '../store/itemSlice'
import { fetchStatusActions } from '../store/fetchStatusSlice'

const FetchItems = () => {
   const fetchStatus= useSelector((state)=> state.fetchStatus)
   const dispatch =useDispatch()

console.log("got it ",fetchStatus);
   
   useEffect(()=>{
    
    if(fetchStatus.fetchDone) return 

    const controller = new AbortController();
    const signal =controller.signal;
    dispatch(fetchStatusActions.markFetchingStarted());

     fetch('http://localhost:8080/items',{signal})
       .then(res => res.json())
       .then(({items}) => {
             console.log(items);
             dispatch(fetchStatusActions.markFetchDone());
             dispatch(fetchStatusActions.markFetchingFinished());
             dispatch(itemsActions.addInitialItems(items[0]));
        });
      
      return()=>{
               controller.abort();  
          }
      },[fetchStatus])


  return (
    <div>
          {/* Fetch done : {fetchStatus.fetchDone}
          currently Fetching :{fetchStatus.currentlyFetching}       */}
    </div>
  )
}

export default FetchItems
