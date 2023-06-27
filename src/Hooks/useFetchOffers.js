import { useState, useEffect } from "react";


export function useFetchOffers(count) {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState();

  async function getOffers(){
    setLoading(true)
    const response = await fetch(`api/get/get-offers?page=${count}`,{
        method: 'GET',
        headers: {'content-type': 'application/json'},
    });
    const data = await response.json();
    if(data){
      setOffers(data.items);
      setLoading(false)
    }
  }

  /*async function searchCollections(){
    if(term.length < 1){return}
    setLoading(true)
    const response = await fetch(`api/get/search-collections?page=${count}&term=${term}`);
    const data = await response.json()
    if(data){
      setCollections(data.items);
      setLoading(false)
    }
  }*/

  useEffect(()=>{
    getOffers();
  }, [count]);

  return {offers, loading};
}