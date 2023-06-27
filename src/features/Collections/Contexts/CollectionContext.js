import { createContext, useState, useEffect } from "react";
import { useDebouncedState, useCounter, usePagination} from '@mantine/hooks';
import { getData, sendFormData } from "../../../utils/utilFunctions";
import Notiflix from "notiflix";

export const CollectionContext  = createContext()

export function CollectionProvider({children}){
    const [count, handlers] = useCounter(1, { min: 1, max: 100});
    const [value, setValue] = useDebouncedState('', 200);
    const [collections, setCollections] = useState();
    const [opened, setOpened] = useState(false);
    const [filter, setFilter] = useState('All');
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState();
    const [editLoading, setEditLoading] = useState()

    const handleItemClick = (value) => {
        setFilter(value)
    };

    const getCollections = async()=> {
        setLoading(true)
        try{
            const collections = await getData(`api/get/get-collections?page=${count}&filter=${filter}`)
           
            setCollections(collections.items)
            setTotalPages(collections.totalPages)
            setLoading(false)
        } catch(error){
            console.log(error.message)
        }
    }

    const searchCollections = async()=> {
        setLoading(true)
        try{
            const collections = await getData(`api/get/search-collections?page=${count}&term=${value}`)
            setCollections(collections.items)
            setTotalPages(collections.totalPages)
            setLoading(false)
        }catch(error){
            console.log(error.message)
        }
    }

    const handleSort = async(option)=> {
        setLoading(true)
        const value = option.value;
        setFilter(value)
    }


    useEffect(()=> {
        if(value.length > 0){
            searchCollections()
        }else{
            getCollections()
        }
    },[filter, count, value]);

    const updateCollection = (collection) => {
        setCollections((prevCollections) =>
        prevCollections.map((prevCollection) =>
            prevCollection.id === collection.id ? collection : prevCollection
          )
        );
    };

    const removeFromFeatured = async(id)=> {
        setEditLoading(true)
        const data = await sendFormData({colId:id, featured:false}, 'api/post/add-collection-featured', 'POST')
        console.log(data)
        if(data.code === 0){
            setEditLoading(false);
            updateCollection(data.response);
            setEditLoading(false)
            Notiflix.Notify.success(`${data.message}`, {position: 'center-top'});
        }
    }

    const addtoFeatured = async(id)=> {
        setEditLoading(true)
        const data = await sendFormData({colId:id, featured:true}, 'api/post/add-collection-featured', 'POST')
        console.log(data)
        if(data.code === 0){
            setEditLoading(false);
            updateCollection(data.response);
            setEditLoading(false)
            Notiflix.Notify.success(`${data.message}`, {position: 'center-top'});
        }
    }
    
    const removeCollection = (id) => {
        const updatedList = collections.filter((collection) => collection.id !== id);
        setCollections(updatedList);
    }
    
    const addToCollection = (collection)=> {
        setCollections([collection, ...collections])
    }

    const contextValue = {
        collections,
        handlers,
        count,
        setValue,
        setOpened,
        opened,
        loading,
        filter,
        value,
        totalPages,
        removeCollection,
        updateCollection,
        addToCollection,
        handleItemClick,
        setLoading,
        editLoading,
        setEditLoading,
        addtoFeatured,
        removeFromFeatured
    }

    return(
        <CollectionContext.Provider value={contextValue}>
            {children}
        </CollectionContext.Provider>
    )
}