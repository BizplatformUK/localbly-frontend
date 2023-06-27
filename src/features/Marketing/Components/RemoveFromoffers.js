import { Button, Checkbox, Tooltip, ActionIcon, Box, Skeleton, Pagination, Card, Loader } from "@mantine/core"
import { useDisclosure, useCounter, useShallowEffect    } from '@mantine/hooks';
import {useState } from "react";
import Notiflix from "notiflix";
import { sendFormData } from "../../../utils/utilFunctions";
import MediumModal from "../../../components/Reusable/Modal";

export default function RemovFromOffers({slug, id}){
    const [opened, { open, close }] = useDisclosure(false);
    const [products, setProducts] = useState([])
    const [pages, setPages] = useState()
    const [items, setItems] = useState([]);
    const [count, handlers] = useCounter(1, { min: 1, max: 100});
    const [loading, setLoading] = useState(false)
    const [pageLoad, setPageLoad] = useState(false)
    const isPresent = pages > 1;

    const getProducts = async()=> {
        setPageLoad(true)
        const response = await fetch(`api/get/get-offer-products?id=${id}&slug=${slug}&page=${count}`);
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
    

    useShallowEffect(()=> {
        getProducts()
    },[count])

    const handleSubmit = async()=> {
        setLoading(true)
        const params = {ids:items, offid:id}
        const response = await sendFormData(params, 'api/delete/remove-from-offers', 'POST');
        if(response.code === 0){
            setLoading(false);
            close();
            Notiflix.Notify.success(`${response.items.length} Successfully removed from offer`, {position: 'center-top'});
        }
    }
    return(
        <>
            <Tooltip withArrow label="remove products from offer"><ActionIcon variant="light" color="blue" onClick={open}><i class="ri-delete-bin-2-fill"></i></ActionIcon></Tooltip>
            <MediumModal opened={opened} close={close}  text="Remove Products from offer">
                <p>{items.length} Selected</p>
                <div>
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
                    <Button mt="lg" disabled={loading} onClick={handleSubmit}>{loading ? <span>Loading<Loader variant="dots" /></span> : 'Remove from Offer'}</Button>
                </div>
            </MediumModal>
        </>
    )
}