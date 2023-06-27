import { useState, useEffect } from "react";
import { getData } from "../utils/utilFunctions";

export function useFetch(url) {
  const [items, setItems] = useState();
  const [loading, setLoading] = useState();
  const [totalPages, setTotalPages] = useState(0)

  async function fetchData(){
    setLoading(true)
    const response = await getData(url);
    if(response){
      setItems(response.items);
      setTotalPages(response.totalPages)
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchData()
  }, [url]);

  return {items, loading};
}