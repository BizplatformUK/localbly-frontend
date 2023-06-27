import { useContext} from "react"
import { productsContext } from "../../Context/Productcontext"
import Empty from "../../../../components/ui/Empty"
import { Button,LoadingOverlay,Menu, Tooltip, Modal, Box, Table, Pagination, TextInput } from "@mantine/core"
import { useDisclosure } from '@mantine/hooks';
import AddProductForm from "../Create/AddProduct"
import Skeleton from "../../../../components/Loaders/Skeleton"
import Product from "./Product"
export default function ProductList(){
    const [opened, { open, close }] = useDisclosure(false);
    const {products, loading, totalPages, editLoading, addFeatured, removeFeatured, ids, setIds,  filter, handleItemClick, setFilter, count, value, handlers, setValue} = useContext(productsContext)
    const isPresent = totalPages > 1;
    
    const isLong = ids.length >= 1;
    return(
        <>
            <TextInput icon={<i class="ri-search-line"></i>} size="md" placeholder="Search" defaultValue={value} onChange={(event) => setValue(event.currentTarget.value)} maw={340}/>
            <Menu width={150} sx={{marginBlock: '0.7rem'}}>
                <Menu.Target><Button leftIcon={<i class="ri-equalizer-line"></i>} size="md" variant="light" color="blue">Filter By</Button></Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item onClick={(event) => handleItemClick(event.currentTarget.textContent)}>All</Menu.Item>
                    <Menu.Item onClick={(event) => handleItemClick(event.currentTarget.textContent)}>Featured</Menu.Item>
                    <Menu.Item onClick={(event) => handleItemClick(event.currentTarget.textContent)}>Standard</Menu.Item>
                </Menu.Dropdown>
            </Menu>
            {isLong && 
                <div className="product-options">
                    <p>{ids.length} Selected</p>
                    <Tooltip label="Make featured on homepage">
                        <Button variant="light" color="blue" onClick={addFeatured}>Make Featured</Button>
                    </Tooltip>
                    <Tooltip label="Remove from homepage featured products">
                        <Button variant="light" color="red" onClick={removeFeatured}>Remove Featured</Button>
                    </Tooltip>
                </div>
            }
            {products?.length === 0 ?  
            <div className="zero"><Empty text="Product" /><Button size="md" leftIcon={<i class="ri-add-line"></i>} onClick={open}>Add New</Button></div> :
                <Box maw="100%" pos="relative">
                       <LoadingOverlay visible={editLoading} overlayBlur={2} />
                        {loading ? <Skeleton /> : 
                            <>
                             
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Products</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products?.map(product=>{
                                            return(<tr key= {product.id}><Product {...product} ids={ids} setIds={setIds} /></tr>)
                                        })}
                                    </tbody>
                                </Table>
                            </>
                        }
            
                    {isPresent && <Pagination total={totalPages} onNextPage={handlers.increment} value={count} onChange={(value)=>handlers.set(value)}  onPreviousPage={handlers.decrement}/>}
                </Box>
            }
            <Modal
                opened={opened}
                onClose={close}
                title="Add New Products"
                fullScreen
                transitionProps={{ transition: 'fade', duration: 200 }}
            >
                <AddProductForm />
            </Modal>
        </>
    )
}