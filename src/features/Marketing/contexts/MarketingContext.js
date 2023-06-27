import { createContext, useState, useEffect } from "react";
import { getData, sendFormData } from "../../../utils/utilFunctions";
import { useDebouncedState, useCounter} from '@mantine/hooks';
import Notiflix from "notiflix";

export const MarketingContext = createContext()

export function MarketingProvider({children}){
    const [count, handlers] = useCounter(1, { min: 1, max: 100});
    const [value, setValue] = useDebouncedState('', 200);
    const [offers, setOffers] = useState();
    const [opened, setOpened] = useState(false);
    const [filter, setFilter] = useState('All');
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState();
    const [editLoading, setEditLoading] = useState(false)

    const handleItemClick = (value) => {
        setFilter(value)
    };


   const getOffers = async()=> {
        setLoading(true)
        const data = await getData(`api/get/get-offers?page=${count}&filter=${filter}`)
        console.log(data)
        setOffers(data.items)
        setTotalPages(data.totalPages)
        setLoading(false)
        
   }

   const searchOffers = async()=> {
    setLoading(true)
    const data = await getData(`api/get/search-offers?page=${count}&term=${value}`);
    setOffers(data.items);
    setTotalPages(data.totalPages);
    setLoading(false)
    
   }

    useEffect(()=> {
        if(value.length > 0){
            searchOffers()
        } else{
            getOffers()
        }
    },[filter, count, value]);

    
    const removeFromFeatured = async(id)=> {
        setEditLoading(true)
        const response = await fetch(`api/delete/remove-featured-offer?id=${id}`, {
            method:'GET',
            headers: {'content-type': 'application/json'},
        })
        const data = await response.json()
        if(data.code === 0){
            setEditLoading(false);
            updateOffers(data.item);
            Notiflix.Notify.success(`offer updated successfully`, {position: 'center-top'});
        }
    }

    const addtoFeatured = async(id)=> {
        setEditLoading(true)
        const params = {offid:id}
        const response = await fetch(`/api/post/add-offer-featured`, {
            method:'POST',
            headers: {'content-type': 'application/json'},
            body:JSON.stringify(params)
        })
        const data = await response.json();
        if(data.code === 0){
            setEditLoading(false);
            updateOffers(data.item);
            setEditLoading(false)
            Notiflix.Notify.success(`category updated successfully`, {position: 'center-top'});
        }
    }
   

    const updateOffers = (offer) => {
        setOffers((prevOffers) =>
          prevOffers.map((prevOffer) =>
            prevOffer.id === offer.id ? offer : prevOffer
          )
        );
    };

    const removeFromOffers = (id) => {
        const updatedList = offers.filter((offer) => offer.id !== id);
        setOffers(updatedList);
    }

     
    const addToOffers = (offer)=> {
        setOffers([offer, ...offers])
    }

    function isPresentFalse(id) {
        setOffers(prevItems =>
          prevItems.map(prevItem =>
            prevItem.id === id ? { ...prevItem, isPresent: false } : prevItem
          )
        );
    }
    
    function isPresentTrue(id) {
        setOffers(prevItems =>
          prevItems.map(prevItem =>
            prevItem.id === id ? { ...prevItem, isPresent: true } : prevItem
          )
        );
    }
 

    const contextValue = {
        offers,
        handlers,
        count,
        setValue,
        setOpened,
        opened,
        loading,
        filter,
        value,
        totalPages,
        setFilter,
        removeFromOffers,
        updateOffers,
        addToOffers,
        handleItemClick,
        isPresentFalse,
        isPresentTrue,
        addtoFeatured,
        removeFromFeatured,
        editLoading,
        setEditLoading
    }

    return(
        <MarketingContext.Provider value={contextValue}>
            {children}
        </MarketingContext.Provider>
    )
}