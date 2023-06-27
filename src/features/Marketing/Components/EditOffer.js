import SelectImage from "../../../components/form/selectImage"
import { useFormik } from "formik"
import { useState, useContext, useEffect } from "react"
import RadioButton from "../../../components/form/RadioButton"
import RadioButtons from "./Radios"
import { Input, Button, Loader } from "@mantine/core"
import Notiflix from "notiflix"
import Image from "next/image"
import { DateInput } from '@mantine/dates';
import styles from '../styles/Marketing.module.css'
import { MarketingContext } from "../contexts/MarketingContext"
import { sendFormData, sendImageData, formatDate, reformatdate} from "../../../utils/utilFunctions"
export default function EditOffer({id, name, picture, type, discount, quantity,from,to, featured, handleClose}){
    const [checked, setChecked] = useState(featured)
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [value, setValue] = useState(type);
    const [loading, setLoading] = useState(false)
    const [start, setStart] = useState(formatDate(from))
    const [till, setTill] = useState(formatDate(to))
    const {offers, updateOffers}= useContext(MarketingContext)
    const formik = useFormik({
        initialValues: {
            name,
            discount,
            quantity: quantity,
            featured:featured
        },
        onSubmit: handleSubmit
    })

    
    async function handleSubmit(values){ 
        setLoading(true)
        const imageUrl = file ? await sendImageData('images', file) : null;
        const params = {
            offerId:id, 
            name:values.name, 
            img: imageUrl || picture, 
            type:value, 
            discount:values.discount, 
            quantity:values.quantity, 
            from:reformatdate(from), 
            to:reformatdate(till), 
            featured:checked
        }
        const data = await sendFormData(params, 'api/post/edit-offer', 'POST');
        if(data.code === 0){
           updateOffers(data.response)
           handleClose()
           setLoading(true)
           Notiflix.Notify.success(`${data.message}`, {position: 'center-top'});
        }
    }
    return(
        <>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        {<div className='edit-image'><Image src={imageUrl ? imageUrl : picture} className="edit-image-img" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt={name} fill /></div>}
           <div className={styles.radios}>
                <RadioButtons value={value} setValue={setValue}/>
           </div>
            <div className={styles.offerImg}>
                <label>Select Offer/Coupon picture</label>
                <SelectImage setFile={setFile} file={file} setImageUrl={setImageUrl} text="Change Image" />
            </div>
            <div className={styles.formFlex}>
                <div className={styles.formGroup}>
                    <label>Offer/Coupon Name</label>
                    <Input size="sm" type="text" value={formik.values.name}  {...formik.getFieldProps('name')} />
                </div>
                <div className={styles.formGroup}>
                    <label>Offer/Coupon Discount</label>
                    <Input  size="sm" type="number" value={formik.values.discount} {...formik.getFieldProps('discount')} />
                </div>
            </div>
        
            <div className={styles.formFlex}>
                <div className={styles.formGroup}>
                    <label>Offer/Coupon Valid From</label>
                    <DateInput size="sm" placeholder="Pick a start date" defaultValue={start}  onChange={setStart} />
                </div>
                <div className={styles.formGroup}>
                    <label>Offer/Coupon Valid Till</label>
                    <DateInput size="sm" placeholder="Pick an end date" defaultValue={till} onChange={setTill} />
                </div>
           </div>
            {value === 'COUPON' && 
            <Input.Wrapper label="Number of Coupons" withAsterisk>
                <Input type="number"  value={formik.values.quantity} {...formik.getFieldProps('quantity')} />
            </Input.Wrapper>}
            <RadioButton setChecked={setChecked} checked={checked} text="Category" />
            <Button type="submit" fullWidth size="md" leftIcon={<i class="ri-upload-2-line"></i>} disabled={loading ? true : false}  >{loading ? <span>Uploading<Loader variant="dots" /></span>: 'Save Changes' }</Button>
        </form>
        </>
    )
}