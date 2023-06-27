import { createContext, useState } from "react";
import { getData } from "../../../Hooks/FetchApi";

export const AuthContext = createContext({
    types: [],
    activeStep:0,
    handleNext: ()=> {},
    handleBack: ()=> {},
    addTypes: ()=>{},
    getTypes: ()=>{}
})

export function AuthProvider({children}){
    const [activeStep, setActiveStep] = useState(0);
    const [types, setTypes] = useState()

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const addTypes = (data)=> {
        setTypes(data)
    }

    const getTypes = async()=>{
        const types = await getData('api/get/get-types');
        setTypes(types.data)
    }
    const contextValue = {
        activeStep,
        handleNext,
        handleBack,
        addTypes,
        getTypes,
        types
    }

    return(
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}