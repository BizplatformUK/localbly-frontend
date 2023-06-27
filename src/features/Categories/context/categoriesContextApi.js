import { createContext, useState, useEffect } from "react";
import { getData, sendFormData } from "../../../utils/utilFunctions";
import { useDebouncedState, useCounter} from '@mantine/hooks';
import { useShallowEffect } from '@mantine/hooks';
import Notiflix from 'notiflix';

export const categoryContext = createContext();

export function CategoryProvider({children}){
    const [count, handlers] = useCounter(1, { min: 1, max: 100});
    const [value, setValue] = useDebouncedState(null, 200);
    const [categories, setCategories] = useState();
    const [opened, setOpened] = useState(false);
    const [filter, setFilter] = useState('All');
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState();
    const [editLoading, setEditLoading] = useState(false)
    //const option = {loading, setLoading, searchTerm, setSearchTerm, setCurrentPage}
    
    const handleItemClick = (value) => {
        setFilter(value)
    };

    const fetchCategories = async()=> {
        setLoading(true)
        try{
            const categories = await getData(`api/get/get-categories?page=${count}&filter=${filter}`)
            setCategories(categories.items)
            setTotalPages(categories.totalPages)
            setLoading(false)
        } catch(error){
            console.log(error.message)
        }
    }

    const searchCategories = async()=> {
        setLoading(true);
        try{
            const response = await getData(`api/get/search-categories?page=${count}&term=${value}`);
            setCategories(response.data);
            setTotalPages(response.totalPages)
            setLoading(false)
        }catch(error){
            console.log(error)
        }
    }

    useShallowEffect(()=> {
        if(value?.length > 0){
            searchCategories()
        }else{
            fetchCategories()
        }
        
    },[filter, count, value]);

    const removeFromFeatured = async(id)=> {
        setEditLoading(true)
        const response = await fetch(`api/post/remove-category-featured?id=${id}`, {
            method:'GET',
            headers: {'content-type': 'application/json'},
        })
        const data = await response.json()
        if(data.code === 0){
            setEditLoading(false);
            updateCategory(data.response);
            Notiflix.Notify.success(`category updated successfully`, {position: 'center-top'});
        }
    }

    const addtoFeatured = async(id)=> {
        setEditLoading(true)
        const data = await sendFormData({catId:id}, 'api/post/add-category-featured', 'POST')
        if(data.code === 0){
            setEditLoading(false);
            updateCategory(data.response);
            setEditLoading(false)
            Notiflix.Notify.success(`category updated successfully`, {position: 'center-top'});
        }
    }

    const updateCategory = (category) => {
        setCategories((prevCategories) =>
          prevCategories.map((prevCategory) =>
            prevCategory.id === category.id ? category : prevCategory
          )
        );
    };

    const removeCategoryFromList = (categoryId) => {
        const updatedList = categories.filter((category) => category.id !== categoryId);
        setCategories(updatedList);
    }

    const addCategoryToList = (category)=> {
        setCategories([category, ...categories])
    }

    function isPresentFalse(id) {
        setCategories(prevItems =>
          prevItems.map(prevItem =>
            prevItem.id === id ? { ...prevItem, isPresent: false } : prevItem
          )
        );
    }
    
    function isPresentTrue(id) {
        setCategories(prevItems =>
          prevItems.map(prevItem =>
            prevItem.id === id ? { ...prevItem, isPresent: true } : prevItem
          )
        );
    }

    const contextValue = {
        categories,
        handlers,
        count,
        setValue,
        setOpened,
        opened,
        loading,
        filter,
        value,
        totalPages,
        removeCategoryFromList,
        updateCategory,
        addCategoryToList,
        handleItemClick,
        isPresentFalse,
        isPresentTrue,
        removeFromFeatured,
        addtoFeatured,
        editLoading,
        setEditLoading
    }

    return(
        <categoryContext.Provider value={contextValue}>
            {children}
        </categoryContext.Provider>
    )
}