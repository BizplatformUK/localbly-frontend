import { useContext, useState} from "react";
import { SubcategoryContext } from "../contexts/SubcategoryContext";
import Skeleton from "../../../components/Loaders/Skeleton";
import { Pagination, TextInput, Table } from "@mantine/core";
import RemoveMultiple from "../../../components/form/RemoveMultiple";
import Empty from "../../../components/ui/Empty";
import Subcategory from "./Subcategory";
import Createsubcategory from "./AddSubcategory";
import AddNew from "../../../components/Reusable/AddNew";

import { useDebouncedState } from '@mantine/hooks';

export default function SubcategoryList(){
    const {subcategories, totalPages, count, loading, handlers, value, setValue} = useContext(SubcategoryContext);
    const isPresent = totalPages > 1;
    const [ids, setIds] = useState([]);
    console.log(subcategories)
    return(
        <>

        <TextInput icon={<i class="ri-search-line"></i>} size="md" placeholder="Search" defaultValue={value} onChange={(event) => setValue(event.currentTarget.value)} maw={340}/>
        {subcategories?.length === 0 ?  
                <div className="zero"><Empty text="Category" /><AddNew text="sub-category"><Createsubcategory /></AddNew></div> :
                <>
                    <Table>
                        <thead>
                            <tr>
                                <th>Subcategory</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        {loading ? <Skeleton /> : 
                            <>
                                <tbody>
                                    
                                    {subcategories?.map(item=>{
                                        return(<tr key={item?.id}><Subcategory {...item} ids={ids} setIds={setIds} /></tr>)
                                    })}
                                </tbody>
                            </> 
                        }
                    </Table>
                </>}
                {isPresent && <Pagination total={totalPages} onNextPage={handlers.increment} value={count} onChange={(value)=>handlers.set(value)}  onPreviousPage={handlers.decrement}/>}
        </>
    );
}