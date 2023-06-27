import { createContext, useEffect, useState } from "react";
import { getData } from "../../../utils/utilFunctions";
import { useDebouncedState, useCounter, useShallowEffect } from '@mantine/hooks';

export const SubcategoryContext = createContext()

export function SubcategoryProvider({children}){
    const [count, handlers] = useCounter(1, { min: 1, max: 100});
    const [value, setValue] = useDebouncedState(null, 200);
    const [subcategories, setSubcategories] = useState();
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState();


    const getSubcategories = async()=> {
        setLoading(true)
        try{
            const data = await getData(`api/get/get-subcategories?page=${count}`);
            console.log(data);
            setSubcategories(data.items)
            setTotalPages(data.totalPages)
            setLoading(false)
        } catch(error){
            console.log(error.message)
        }
    }

    const searchSubCategories = async()=> {
        setLoading(true)
        const data = await getData(`api/get/search-subcategories?page=${count}&term=${value}`);
        if(data){
            setLoading(false)
            setSubcategories(data.items)
            setTotalPages(data.totalPages);
        }
    }

    useShallowEffect(()=> {
        if(value?.length > 0){
            searchSubCategories()
        }else{
            getSubcategories()
        }
        
    },[count, value]);


    const updateSubcategories = (subcategory) => {
        setSubcategories((prevSubcategories) =>
        prevSubcategories.map((prevSubcategory) =>
        prevSubcategory.id === subcategory.id ? subcategory : prevSubcategory
          )
        );
    };

    const removeSubcategoriesFromList = (id) => {
        const updatedList = subcategories.filter((category) => category.id !== id);
        setSubcategories(updatedList);
    }

    const addSubcategoriesToList = (subcategory)=> {
        setSubcategories([subcategory, ...subcategories])
    }

    const contextValue = {
        subcategories,
        handlers,
        count,
        setValue,
        loading,
        value,
        totalPages,
        updateSubcategories,
        removeSubcategoriesFromList,
        addSubcategoriesToList
    }

    return(
        <SubcategoryContext.Provider value={contextValue}>
            {children}
        </SubcategoryContext.Provider>
    )
}