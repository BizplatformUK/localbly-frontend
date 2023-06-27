import { createContext, useState, useEffect } from "react";
import { getData } from "../utils/utilFunctions";

export const BannerContext = createContext()

export function BannerProvider({children}){
    const [items, setItems] = useState()
    const [loading, setLoading] = useState(true)
    
    async function fetchItems(){
        setLoading(true)
        const response = await getData('api/get/get-banner');
        setItems(response.items)
        setLoading(false)
    }

    

    const removefromList = (id) => {
        const updatedList = items.filter((item) => item.itemID !== id);
        setItems(updatedList);
    }

    const contextValue = {
        items,
        fetchItems,
        removefromList,
        loading
    }

    return(
        <BannerContext.Provider value={contextValue}>
            {children}
        </BannerContext.Provider>
    )
}