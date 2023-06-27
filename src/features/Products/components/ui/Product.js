import { Checkbox, ActionIcon, Indicator,Modal } from "@mantine/core"
import { useContext } from "react"
import { productsContext } from "../../Context/Productcontext"
import DeleteItem from "../../../../components/form/Delete"
import { useDisclosure } from '@mantine/hooks';
import Image from "next/image";
import EditProduct from "./Editproduct";
export default function Product({ name, id, picture, category, subcategory, collection, offer, price, onSale, salePrice, categoryID, subcategoryID, featuredCategory,featuredHome, offerId, options,tags, collectionsID, description}){
    const {removeFromList, ids, setIds} = useContext(productsContext)
    const url = `api/delete/delete-product?id=${id}`
    const [opened, { open, close }] = useDisclosure(false);
    const product = {
        name, 
        id, 
        picture, 
        category, 
        subcategory, 
        collection, 
        offer,
        price, 
        onSale, 
        salePrice, 
        catId:categoryID, 
        subId:subcategoryID, 
        fcat:featuredCategory,
        fhome:featuredHome, 
        offerId, 
        options,
        tags, 
        colId:collectionsID, 
        description
    }
   
    return(
        <>
                    <td>
                        <Checkbox.Group value={ids} onChange={setIds}>
                            <label>
                                <div className="item-check">
                                    <Checkbox value={id} checked={ids.includes(id)} />
                                    <div class="item-image">
                                        <Image src={picture} alt={name} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill />
                                        {featuredHome || featuredHome === 1 ? <Indicator inline label="featured" size="14" className='indicator' /> : '' }
                                    </div>
                                    <div>
                                        <p>{name}</p>
                                        <p><small>Kes</small>{price}</p>
                                    </div>
                                </div>
                            </label>
                        </Checkbox.Group>
                       
                    </td>
                    <td className="td-action">
                        <ActionIcon variant="light" color="blue" onClick={open}><i class="ri-edit-line"></i></ActionIcon>
                        <DeleteItem removeItem={removeFromList} url={url} text="Product"/>
                    </td>
            <Modal
                opened={opened}
                onClose={close}
                title="Edit Product"
                size="auto"
                transitionProps={{ transition: 'fade', duration: 200 }}
            >
                <EditProduct {...product} handleClose={close}/>
                
            </Modal>
        </>
    )
}