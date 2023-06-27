import { createContext, useState } from "react";
import { getData } from "../../../utils/utilFunctions";
import { useShallowEffect, useCounter  } from '@mantine/hooks';

export const ClientsContext = createContext()

export function ClientsProvider({children}){
    const [count, handlers] = useCounter(1, { min: 1, max: 100});
    const [clients, setClients] = useState()
    const [totalPages, setTotalPages] = useState(0);
    const[loading, setLoading] = useState(true)

    async function getClients(){
        const data = await getData(`api/get/get-clients?page=${count}`);
        setClients(data.items)
        setTotalPages(data.totalPages)
        setLoading(false)
    }

    useShallowEffect(()=> {
        getClients()
    },[count]);


    const updateClients = (client) => {
        setClients((prevClients) =>
        prevClients.map((prevClient) =>
            prevClient.id === client.id ? client : prevClient
          )
        );
    };

    const removeFromClients = (id) => {
        const updatedList = clients.filter((client) => client.id !== id);
        setClients(updatedList);
    }

    const addToClients = (client)=> {
        setClients([client, ...clients])
    }

    const contextValue = {
        list:clients,
        totalPages:totalPages,
        addToClients,
        removeFromClients,
        updateClients,
        handlers,
        count,
        loading
    }

    return(
        <ClientsContext.Provider value={contextValue}>
            {children}
        </ClientsContext.Provider>
    )
}