

import { getData } from '../../../Hooks/FetchApi';
import { useState, useEffect } from 'react';
export default function CategoryDropdown({formik}){
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState({id:formik.values.category, name: formik.values.catName})
    useEffect(()=> {
        const fetchData = async()=> {
            setLoading(true)
                try{
                    const categories = await getData(`api/get/get-categories?page=${currentPage}`)
                    if(categories.data){
                        setLoading(false)
                        setCategories(categories.data)
                    }
                   
                    //setPage(categories)
                }catch(error){
                    console.log(error.message)
                }
        }
        fetchData()
    },[currentPage])
 
  
    return (
        <>
         {/*<Autocomplete
                id="category"
                name="category"
                options={categories}
                getOptionLabel={option => option.name}
                fullWidth
                sx={{ width: '100%' }}
                value={selectedCategory} // set the value to the selectedCategory state
                onChange={(event, newValue) => {
                    setSelectedCategory(newValue); // update the selectedCategory state with the new value
                    formik.setFieldValue("category", newValue.id);
                }}
                renderInput={params => (
                    <div className="form-group" ref={params.InputProps.ref}>
                        <label>Select Category</label>
                        <input labelPlaceholder="Category" id="category" name="category" {...params.inputProps} autoFocus />
                    </div>
                )}}
        />
                */} 
        </>
      );
      
}