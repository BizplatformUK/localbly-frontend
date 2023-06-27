import { useContext, useEffect } from "react";
import { ClientsContext } from "../Contexts/ClientsContext";
import Skeleton from "../../../components/Loaders/Skeleton";
import Empty from "../../../components/ui/Empty";
import Client from "./Client";
import AddNew from "../../../components/Reusable/AddNew";
import AddClient from "./AddClient";
import { Pagination, Table } from "@mantine/core";


export default function ClientList(){
    const {list, state, totalPages, count, loading, handlers} = useContext(ClientsContext)
    const isPresent = totalPages > 1;
    
    return(
       <>
         {list?.length === 0 ? <div className="zero"><Empty text="Client" /><AddNew text="Client"><AddClient /></AddNew></div> :
            <>
                <Table>
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {loading ? <Skeleton />  : 
                        <tbody>
                            {list?.map(item=> {
                                return(<tr key={item?.id}><Client {...item} /></tr>)
                            })}
                        </tbody>
                    }
                </Table>
                {isPresent && <Pagination total={totalPages} onNextPage={handlers.increment} value={count} onChange={(value)=>handlers.set(value)}  onPreviousPage={handlers.decrement}/>}
            </>
         }
       </>
        
    )
}