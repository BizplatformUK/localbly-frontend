import { createContext, useState} from "react";


export const GlobalContext = createContext()

export function GlobalProvider({children}){
    const [selectedCategory, setSelectedCategory] = useState({});
    const [selectedSubCategory, setSelectedSubcategory] = useState({})


    const contextValue = {
       selectedCategory,
       setSelectedCategory,
       selectedSubCategory,
       setSelectedSubcategory
    }

    return(
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    )
}