import { useState, useEffect } from "react";
import { getData } from "../utils/utilFunctions";

export function useFetchSubcategories(count, id, term) {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState()

  async function getSubcategories(){
    setLoading(true)
    if(!id){return}
    const data = await getData(`api/get/get-cat-subcategories?page=${count}&id=${id}`)
    if(data){
      setSubcategories(data.items)
      setLoading(false)
    }
  }

  async function searchSubcategories(){
    setLoading(true);
    if(term.length < 1){return}
    const data = await getData(`api/get/search-subcategories?page=${count}&term=${term}`);
    if(data){
      setSubcategories(data.items)
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(term.length > 0 ){
      searchSubcategories();
    }else{
      getSubcategories();
    }
  }, [count, id, term]);

  return {subcategories, loading};
}