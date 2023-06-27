import { createContext, useState, useEffect } from "react";
import { getData } from "../../../utils/utilFunctions";
export const ServicesContext = createContext({
    list: [],
    currentPage: '',
    totalPages: '',
    handlePrevClick: ()=> {},
    handleNextClick: ()=> {},
    updateService: ()=>{},
    removeFromServices: ()=>{},
    addToServices: ()=>{},
    handleChange: ()=>{},
    state: {}
})

export function ServicesProvider({children}){
    const [services, setServices] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true)
    const state = {searchTerm, setSearchTerm, loading, setLoading}
 

    const getServices = async()=> {
        try{
            const data = await getData(`api/get/get-services?page=${currentPage}`)
            setServices(data.items)
            setTotalPages(data.totalPages)
            setLoading(false)
        } catch(error){
            console.log(error.message)
        }
    }

    const searchServices = async()=> {
        try{
            const data = await getData(`api/get/search-services?page=${currentPage}&term=${searchTerm}`)
            setServices(data.items)
            setTotalPages(data.totalPages)
            setLoading(false)
        }catch(error){
            console.log(error.message)
        }
    }

    useEffect(()=> {
        if(searchTerm.length > 0){
            searchServices()
        } else{
            getServices()
        }
    }, [searchTerm, currentPage])

    const handleChange = (e)=> {
        setLoading(true)
        setSearchTerm(e.target.value);
    }

    const handlePrevClick = () => {
        setCurrentPage((prevPage) => prevPage - 1);
      };
      
    const handleNextClick = () => {
          setCurrentPage((prevPage) => prevPage + 1);
    };

    const updateService = (service) => {
        setServices((prevServices) =>
        prevServices.map((prevService) =>
        prevService.id === service.id ? service : prevService
          )
        );
    };
    
    const removeFromServices = (id) => {
        const updatedList = services.filter((service) => service.id !== id);
        setServices(updatedList);
    }

    const addToServices = (service)=> {
        setServices([service, ...services])
    }

    const contextValue = {
        list:services,
        currentPage: currentPage,
        totalPages:totalPages,
        handlePrevClick,
        handleNextClick,
        updateService,
        removeFromServices,
        addToServices,
        handleChange,
        state
    }

    return(
        <ServicesContext.Provider value={contextValue}>
            {children}
        </ServicesContext.Provider>
    )
}