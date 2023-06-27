import {useContext } from "react";
import { ServicesContext } from "../Contexts/ServicesContext";
import Empty from '../../../components/ui/Empty'
import Service from "./Service";
import Skeleton from "../../../components/Loaders/Skeleton";
import CreateService from "./CreateService";
import { Pagination, Table } from "@mantine/core";
import AddNew from "../../../components/Reusable/AddNew";
export default function ServicesList(){
   const {currentPage, totalPages, list, handlePrevClick, handleNextClick, state} = useContext(ServicesContext)
   const isPresent = totalPages > 1;
    return(
        <>
            {list?.length === 0 ? <div className="zero"><Empty text="Services" /><AddNew text="Services"><CreateService /></AddNew></div> :
                <>
                    <Table>
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {state.loading ? <Skeleton /> :
                            <>
                               <tbody>
                                    {list?.map(service=>{
                                        return(<tr key={service?.id} ><Service {...service} /></tr>)
                                    })}
                                </tbody> 
                            </> 
                        }
                    </Table>
                </>
            }
        </>
    );
}