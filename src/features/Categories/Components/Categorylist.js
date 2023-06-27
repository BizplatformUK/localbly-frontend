import {useContext, useState} from "react";
import { categoryContext } from '../context/categoriesContextApi';
import Skeleton from "../../../components/Loaders/Skeleton";
import Createcategory from "./Createcategory";
import Empty from "../../../components/ui/Empty";
import AddNew from "../../../components/Reusable/AddNew";
import Category from "./Category";
import {Table, LoadingOverlay, Pagination, Button, Menu, TextInput } from "@mantine/core";
export default function Categorylist(){
   const {categories, opened, setOpened, totalPages, count, loading, handleItemClick, handlers, value, editLoading, setValue} = useContext(categoryContext)
   const isPresent = totalPages > 1;
   const [ids, setIds] = useState([])

   return(
        <>
        <div className="sorting-top">
            <TextInput icon={<i class="ri-search-line"></i>} size="md" placeholder="Search Categories" defaultValue={value} onChange={(event) => setValue(event.currentTarget.value)} maw={340}/>
            <Menu opened={opened} onChange={setOpened} width={150} sx={{marginBlock: '0.7rem'}}>
                <Menu.Target><Button leftIcon={<i class="ri-equalizer-line"></i>} size="md" variant="light" color="blue">Filter By</Button></Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item onClick={(event) => handleItemClick(event.currentTarget.textContent)}>All</Menu.Item>
                    <Menu.Item onClick={(event) => handleItemClick(event.currentTarget.textContent)}>Featured</Menu.Item>
                    <Menu.Item onClick={(event) => handleItemClick(event.currentTarget.textContent)}>Standard</Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </div>
            {categories?.length === 0 ?  
                <div className="zero"><Empty text="Category" /><AddNew text="Category"><Createcategory /></AddNew></div> :
                <>
                    <Table>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        {loading ? <Skeleton /> : 
                            <>
                                {editLoading &&  <LoadingOverlay visible={editLoading} overlayBlur={2} /> }
                                <tbody>
                                    
                                    {categories?.map(category=>{
                                        return(<tr key={category.id}><Category {...category} ids={ids} setIds={setIds} /></tr>)
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