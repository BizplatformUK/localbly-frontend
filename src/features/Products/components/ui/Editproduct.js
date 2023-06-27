import { useState, useContext, useRef} from "react";
import { productsContext } from "../../Context/Productcontext";
import SelectImage from "../../../../components/form/selectImage";
import { useFormik } from "formik";
import Notiflix from "notiflix";
import CategoryDropdown from "../../../../components/Reusable/CategoryDropdown";
import CollectionsDropdown from "../../../../components/Reusable/CollectionsDropdown";
import OffersDropdown from "../../../../components/Reusable/OffersDropdown";
import SubcategoryDropdown from "../../../../components/Reusable/SubcategoryDropdown";
import Featured from "../Create/Featured";
import ColorsOption from "../Create/Options/Colors";
import SizeOption from "../Create/Options/Sizes";
import Image from "next/image";
import { useShallowEffect, useSetState } from '@mantine/hooks';
import { Button,Input,Title,Text,Grid,Textarea,Card,Loader } from "@mantine/core";
import ProductPrice from "../Create/ProductPrice";
import styles from '../../../../styles/Products.module.css'
import { sendFormData, sendImageData } from "../../../../utils/utilFunctions";

export default function EditProduct({name, id, picture, category, subcategory, collection, offer, price, onSale, salePrice, catId, subId, fcat,fhome, offerId, options,tags, colId, description, handleClose}){
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [checked, setChecked] = useState(onSale || false);
    const [loading, setLoading] = useState()
    const [colorsArr, setColorsArr] = useState(options.colors)
    const [sizesArr, setSizesArr] = useState(options.sizes)

    const [state, setState] = useSetState({ catId: catId, name: category, subcatId: subId, subcat:subcategory});

    const {shop, getShop, updateList} = useContext(productsContext)
  
    const formik = useFormik({
        initialValues:{
            name: name,
            catId: catId,
            subId: subId,
            price:price,
            salePrice:salePrice,
            description:description,
            fhome:fhome,
            fcat:fcat,
            tags: tags,
            options:options,
            collection: colId,
            offer:offerId
        },
        onSubmit: handleSend
    })
   
    useShallowEffect(() => {
        getShop()
    },[]);
    async function handleSend(values){
        setLoading(true)
        const tagsStr = `${state.name}, ${state.subcat}, ${values.tags.split(', ').join(', ')}`;
        const imageUrl = file ? await sendImageData('products', file) : null;
        const params = {
            prodId:id,
            name:values.name,
            catId:state.catId,
            subId:state.subcatId,
            image:file === null ? picture : imageUrl,
            price:values.price,
            onSale:checked,
            salePrice:values.salePrice,
            fhome:values.fhome,
            fcat:values.fcat,
            description:values.description,
            options:{colors:colorsArr, sizes:sizesArr},
            tags:tagsStr,
            offerId:values.offer,
            collection:values.collection
        }
        const response = await sendFormData(params, 'api/post/edit-product', 'POST');
        if(response.code === 0){
            formik.resetForm()
            setLoading(false)
            updateList(response.insert)
            setColorsArr(response.insert.options.colors)
            setSizesArr(response.insert.options.sizes)
            handleClose()
            Notiflix.Notify.success(`${response.message}`, {position: 'center-top'});
        }
        
   }
    
    return(
        <>
            <form onSubmit={formik.handleSubmit} className={styles.addProductForm}>
                <Card withBorder radius="md">
                    <Card.Section withBorder inheritPadding py="xs">
                        <Text weight={500}>Product Details</Text>
                    </Card.Section>
                    <Card.Section mt="sm" inheritPadding py="xs">
                    <Image src={file ? imageUrl : picture} alt={name} width={200} height={200}/>
                    <label>Product Picture</label>
                    <SelectImage setFile={setFile} file={file} setImageUrl={setImageUrl} text="Select Picture" />
                    <div className={styles.formFlex}>
                        <div className={styles.formGroup}>
                            <Input.Wrapper withAsterisk label="Product Name" maw={360}>
                                <Input type="text" size="md" id="name" name="name" value={formik.values.name} {...formik.getFieldProps('name')} />
                            </Input.Wrapper>
                        </div>
                        <div className={styles.formGroup}>
                            <Input.Wrapper withAsterisk label="Product Price" maw={360}>
                                <Input type="number" size="md" value={formik.values.price} {...formik.getFieldProps('price')} />
                            </Input.Wrapper>
                        </div>
                    </div>
                    <ProductPrice setChecked={setChecked} checked={checked} formik={formik}/>
                    <div className={styles.formFlex}>
                        <div className={styles.formGroup}><CategoryDropdown setState={setState} state={state} /></div>
                        <div className={styles.formGroup}><SubcategoryDropdown setState={setState} state={state} /></div>
                    </div>
                    <Textarea placeholder="Give your product a description" withAsterisk label="Product description" autosize minRows={2} sx={{marginTop:'0.6rem'}} id="description" value={formik.values.description} {...formik.getFieldProps('description')}  />
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
                                    <CollectionsDropdown formik={formik}  collection={collection} />
                                </div>
                                {shop?.version !== 'Free Trial' && 
                                    <div className={styles.formGroup}>
                                        <OffersDropdown formik={formik}  offer={offer} />
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
                <Button type="submit" size="md" leftIcon={<i class="ri-upload-2-line"></i>} sx={{marginTop:'0.6rem'}} disabled={loading ? true : false}  >{loading ? <span>Uploading<Loader variant="dots" /></span>: 'Save Changes' }</Button>
           </form>
        </>
    )
}