import {Input, Button, Loader, Card, Text } from "@mantine/core"
import CategoryDropdown from "../../../../components/Reusable/CategoryDropdown"
import SubcategoryDropdown from "../../../../components/Reusable/SubcategoryDropdown"
import SelectImage from "../../../../components/form/selectImage"
import ProductPrice from "./ProductPrice"
import { useState, useContext } from "react"
import Featured from "./Featured"
import { useFormik } from "formik"
import Notiflix from "notiflix"
import ProductDescription from "./Description"
import OffersDropdown from "../../../../components/Reusable/OffersDropdown"
import CollectionsDropdown from '../../../../components/Reusable/CollectionsDropdown'
import { productsContext } from "../../Context/Productcontext"
import ColorsOption from "./Options/Colors"
import SizeOption from "./Options/Sizes"
import Image from "next/image"
import { useShallowEffect, useSetState } from '@mantine/hooks';
import { sendFormData, sendImageData } from "../../../../utils/utilFunctions"
import styles from '../../../../styles/Products.module.css'

export default function AddProductForm(){
    const [checked, setChecked] = useState(false);
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false)
    const [desc, setDesc] = useState(false);
    const [colorsArr, setColorsArr] = useState(null)
    const [sizesArr, setSizesArr] = useState(null)
    const {getShop, shop, addtoList} = useContext(productsContext)
    const [state, setState] = useSetState({ catId: null, name: null, subcatId: null, subcat:null});
    
    useShallowEffect(() => {
        getShop()
    },[]);

    const formik = useFormik({
        initialValues:{
            name: "",
            catId: '',
            subId: '',
            price: 0,
            salePrice: 0,
            description: '',
            aidesc: '',
            fhome:false,
            fcat:false,
            tags: '',
            offer:null,
            collection:null
            
        },
        onSubmit: handleSend
    })
    async function handleSend(values){
        setLoading(true)
        const tagsStr = `${state.name}, ${state.subcat}, ${values.tags.split(', ').join(', ')}`;
        const imageUrl = await sendImageData('products', file)
        const params = {
            name:values.name,
            catId:state.catId,
            subId:state.subcatId,
            image:imageUrl,
            price:values.price,
            onSale:checked,
            salePrice:values.salePrice,
            fhome:values.fhome,
            fcat:values.fcat,
            description:values.aidesc === '' ? values.description : values.aidesc,
            options:{colors:colorsArr, sizes:sizesArr},
            tags:tagsStr,
            offerId:values.offer,
            collection:values.collection
        }
        const response = await sendFormData(params, 'api/post/add-product', 'POST');
        if(response.code === 3){
            setLoading(false);
            Notiflix.Notify.failure(`${response.error}`, {position: 'center-top'});
        } else{
            setState({ catId: null, name: null, subcatId: null, subcat:null})
            setChecked(false)
            addtoList(response.response)
            setLoading(false)
            setFile(null)
            setImageUrl(null);
            setColorsArr(null)
            setSizesArr(null)
            formik.resetForm();
            Notiflix.Notify.success(`${response.message}`, {position: 'center-top'});
        }
    }
  
    return(
        <>
         <form onSubmit={formik.handleSubmit} className={styles.addProductForm}>
            <Card withBorder>
                <Card.Section withBorder inheritPadding py="xs">
                    <Text weight={500}>Product Details</Text>
                </Card.Section>
                <Card.Section mt="sm" inheritPadding py="xs">
                    {imageUrl && <Image src={imageUrl} width={100} height={100} alt="Product image" /> }
                    <div className={styles.formGroup}>
                        <label>Product Picture</label>
                        <SelectImage setFile={setFile} file={file} setImageUrl={setImageUrl} text="Select Picture" />
                    </div>
                    <div className={styles.formFlex}>
                        <div className={styles.formGroup}>
                            <Input.Wrapper withAsterisk label="Product Name">
                                <Input type="text" size="md" id="name" name="name" {...formik.getFieldProps('name')}   />
                            </Input.Wrapper>
                        </div>
                        <div className={styles.formGroup}>
                            <Input.Wrapper withAsterisk label="Product Price">
                                <Input type="number" size="md" id="price" name="price" {...formik.getFieldProps('price')}  />
                            </Input.Wrapper>
                        </div>
                    </div>
                    <ProductPrice setChecked={setChecked} checked={checked} formik={formik} />
                    <div className={styles.formFlex}>
                        <div className={styles.formGroup}><CategoryDropdown setState={setState} state={state} /></div>
                        <div className={styles.formGroup}><SubcategoryDropdown setState={setState} state={state} /></div>
                    </div>
                    <ProductDescription formik={formik} styles={styles} />
                </Card.Section>  
            </Card>
            <Card withBorder mt="md">
                <Card.Section withBorder inheritPadding py="xs">
                    <Text weight={500}>Product Options</Text>
                </Card.Section>
                <Card.Section mt="sm" inheritPadding py="xs">
                    <Featured formik={formik} category={state.name}/>
                    <div className={styles.formFlex}>
                        <div className={styles.formGroup}>
                            <CollectionsDropdown formik={formik}  collection={null} />
                        </div>
                        {shop?.version !== 'Free Trial' && 
                        <div className={styles.formGroup}>
                                <OffersDropdown formik={formik}  offer={null} />
                            </div>
                        }
                    </div>
                </Card.Section>
            </Card>
            <Card withBorder mt="md">
                <Card.Section withBorder inheritPadding py="xs">
                    <Text weight={500}>Product Variations</Text>
                </Card.Section>
                <Card.Section mt="sm" inheritPadding py="xs">
                        <ColorsOption setColorsArr={setColorsArr} colorsArr={colorsArr} />
                        <SizeOption sizezArr={sizesArr} setSizesArr={setSizesArr} />
                    <div className={styles.formGroup}>
                        <Input.Wrapper label="tags" description="Provide different variation of the product name serparated by commas e.g shoes, high-heels, sneakers etc" maw={360}>
                            <Input type="text" size="md" value={formik.values.tags} {...formik.getFieldProps('tags')} />
                        </Input.Wrapper>
                    </div>
                </Card.Section>
            </Card>
            <Button type="submit" size="md" leftIcon={<i class="ri-upload-2-line"></i>} disabled={loading} sx={{marginTop:'0.6rem'}}   >{loading ? <span>Uploading<Loader variant="dots" /></span>: 'Upload' }</Button>
        </form> 
           
        </>
    )
}