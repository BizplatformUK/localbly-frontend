import { useContext} from "react";
import { CollectionContext } from "../Contexts/CollectionContext";
import Empty from '../../../components/ui/Empty'
import CreateCollection from "./CreateCollection";
import Collection from "./Collection";
import Skeleton from "../../../components/Loaders/Skeleton";
import { Pagination,Box, TextInput, LoadingOverlay, Menu, Button, Table } from "@mantine/core";
import AddNew from "../../../components/Reusable/AddNew";
export default function CollectionsList(){
    const {collections, opened, setOpened, totalPages, count, loading, editLoading, handleItemClick, handlers, value, setValue} = useContext(CollectionContext)
    const isPresent = totalPages > 1;
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
        
        {collections?.length === 0 ? 
            <div className="zero"><Empty text="Collections" /><AddNew text="Collections"><CreateCollection /></AddNew></div>
        : 
        <Box maw="100%" pos="relative">
            <LoadingOverlay visible={editLoading} overlayBlur={0.3} overlayColor="#c5c5c5" />
            {/* ...other content */}
            <Table>
                <thead>
                    <tr>
                        <th>Collection</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {loading ? <Skeleton /> :  
                    <tbody>
                        {collections?.map(item=> {
                            return(<tr key={item?.id}><Collection {...item} /></tr>)
                        })}
                    </tbody>
                }
            </Table>
            {isPresent && <Pagination total={totalPages} onNextPage={handlers.increment} value={count} onChange={(value)=>handlers.set(value)}  onPreviousPage={handlers.decrement}/>}
        
        </Box>
        }
        </>
    );
}