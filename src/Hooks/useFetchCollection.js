import { useState, useEffect } from "react";


export function useFetchCollection(count, term) {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState();

  async function getCollections(){
    setLoading(true)
    const response = await fetch(`api/get/get-collections?page=${count}&filter=All`,{
        method: 'GET',
        headers: {'content-type': 'application/json'},
    });
    const data = await response.json();
    if(data){
      setCollections(data.items);
      setLoading(false)
    }
  }

  async function searchCollections(){
    if(term.length < 1){return}
    setLoading(true)
    const response = await fetch(`api/get/search-collections?page=${count}&term=${term}`);
    const data = await response.json()
    if(data){
      setCollections(data.items);
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(term.length > 0 ){
        searchCollections();
      }else{
        getCollections()
      }
  }, [count, term]);

  return {collections, loading};
}