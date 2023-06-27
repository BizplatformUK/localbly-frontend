import { createContext, useState, useEffect } from "react";
import { getData } from "../../../utils/utilFunctions";
import { useSetState } from '@mantine/hooks';

export const ProfileContext = createContext()

export function ProfileProvider({children}){
    const [shop, setShop] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState();
    const [state, setState] = useSetState({ color: '', type: '', typeID: '' });

    const getSingleShop = async()=> {
        try{
            const response = await fetch(`api/get/get-shop`);
            const data = await response.json()
            setShop(data)
            setState({type:data.shopType, typeID:data.typeID})
        } catch(error){
            console.log(error.message)
        }
    }


    const contextValue = {
        shop,
        getSingleShop,
        state
    }

    return(
        <ProfileContext.Provider value={contextValue}>
            {children}
        </ProfileContext.Provider>
    )
}