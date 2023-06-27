import { Button, Checkbox, Tooltip, ActionIcon, Box, Skeleton, Pagination, Card, TextInput, Loader } from "@mantine/core"
import { useDisclosure, useDebouncedState, useCounter, useShallowEffect    } from '@mantine/hooks';
import { useEffect, useState } from "react";
import Notiflix from "notiflix";
import { sendFormData } from "../../../utils/utilFunctions";
import styles from '../Styles/Collections.module.css'
import MediumModal from "../../../components/Reusable/Modal";
export default function AddToCollections({name, id}){
    const [opened, { open, close }] = useDisclosure(false);
    const [products, setProducts] = useState([])
    const [value, setValue] = useDebouncedState('', 200);
    const [pages, setPages] = useState()
    const [items, setItems] = useState([]);
    const [count, handlers] = useCounter(1, { min: 1, max: 100});
    const [loading, setLoading] = useState(false)
    const [pageLoad, setPageLoad] = useState(false)
    const isPresent = pages > 1;

    const getProducts = async()=> {
        setPageLoad(true)
        const response = await fetch(`api/get/get-uncollected-products?id=${id}&page=${count}`);
        const products = await response.json();
        const data = []
        products.items.forEach(product => {
            const item = {name:product.name, id:product.id}
            data.push(item)
        });
        setProducts(data)
        setPages(products.totalPages)
        setPageLoad(false)
    }

    const searchProducts = async()=> {
        setPageLoad(true)
        const response = await fetch(`api/get/search-products?page=${count}&term=${value}`);
        const products = await response.json();
        console.log(products)
        const data = []
        products.items.forEach(product=> {
            const item = {name:product.name, id:product.id}
            data.push(item)
        })
        setProducts(data)
        setPages(data.totalPages)
        setPageLoad(false)
    }

    useShallowEffect(()=> {
        if(value.length > 0){
            searchProducts()
        }else{
            getProducts()
        }
        
    },[value, count])

    const handleSubmit = async()=> {
        setLoading(true)
        const params = {ids:items, colid:id}
        const response = await sendFormData(params, 'api/post/add-to-collections', 'POST');
        if(response.code === 0){
            setLoading(false);
            close();
            Notiflix.Notify.success(`${response.message}`, {position: 'center-top'});
        }
    }
    return(
        <>
            <Tooltip withArrow label="add products to collection"><ActionIcon variant="light" color="blue" onClick={open}><i class="ri-add-line"></i></ActionIcon></Tooltip>
            <MediumModal opened={opened} close={close}  text="Add Products to collection">
                <p>{items.length} Selected</p>
                <div className={styles.productList}>
                    <TextInput defaultValue={value} onChange={(event)=>setValue(event.currentTarget.value)} placeholder="Search collections" sx={{margin:'0.4rem'}} />
                    {pageLoad ? 
                    <Box width={400} sx={{paddingInline:'5%'}}>
                        <Skeleton height={10} mt={10} width="70%" radius="xl" />
                        <Skeleton height={10} mt={10} width="70%" radius="xl" />
                        <Skeleton height={10} mt={10} width="70%" radius="xl" />
                    </Box> : 
                    <>
                        {products?.map((option) => (
                            <Checkbox.Group value={items} onChange={setItems} key={option.id}>
                                <Card withBorder radius="md" size="sm" color="cyan" sx={{margin: '0.4rem'}} shadow={items.includes(option.id) ? 'lg' : ''}>
                                    <label><Checkbox value={option.id} checked={items.includes(option.id)} label={option.name} /></label>
                                </Card>
                            </Checkbox.Group>
                        ))}
                        {isPresent && <Pagination total={pages} onNextPage={handlers.increment} value={count} onChange={(value)=>handlers.set(value)}  onPreviousPage={handlers.decrement}/>}
                    </>}
                    <Button mt="lg" disabled={loading} onClick={handleSubmit}>{loading ? <Loader variant="dots" /> : 'Add to Collection'}</Button>
                </div>
            </MediumModal>
        </>
    )
}