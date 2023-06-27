import { useState, useEffect } from "react";
import { getData } from "../utils/utilFunctions";
import { useShallowEffect } from '@mantine/hooks';
export function useFetchCategories(count, term) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState();

  async function getCategories(){
    setLoading(true)
    const response = await getData(`api/get/get-categories?page=${count}&filter='All'`);
    if(response){
      setCategories(response.items);
      setLoading(false)
    }
  }

  async function searchCategories(){
    if(term.length < 1){return}
    setLoading(true)
    const response = await getData(`api/get/search-categories?page=${count}&term=${term}`);
    if(response){
      setCategories(response.data);
      setLoading(false)
    }
  }

  useShallowEffect(()=>{
    if(term.length > 0 ){
      searchCategories();
    }else{
      getCategories()
    }
  }, [count, term]);

  return {categories, loading};
}