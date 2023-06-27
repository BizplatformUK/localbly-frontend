import SelectImage from "../../../components/form/selectImage"
import { useState, useContext } from "react"
import { useFormik } from "formik"
import Notiflix from "notiflix"
import { DateInput } from '@mantine/dates';
import RadioButtons from "./Radios"
import Image from "next/image";
import { Button, Loader, Input} from "@mantine/core"
import styles from '../styles/Marketing.module.css'
import RadioButton from "../../../components/form/RadioButton"
import { MarketingContext } from "../contexts/MarketingContext"
import { sendFormData, sendImageData,reformatdate } from "../../../utils/utilFunctions"

export default function CreateOffer(){
    const [checked, setChecked] = useState(false)
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [value, setValue] = useState('');
    const [from, setFrom] = useState(null)
    const [till, setTill] = useState(null)
    const [loading, setLoading] = useState(false)
    const {addToOffers} = useContext(MarketingContext)
    const formik = useFormik({
        initialValues:{
            name:"",
            discount: 0,
            quantity: 0,
            featured: false
        },
        onSubmit: handleSend
   })
   
   async function handleSend(values) {
    setLoading(true)
    const imageUrl = await sendImageData('images', file)
    const params = {name:values.name, type:value, img:imageUrl,  discount:values.discount, quantity:values.quantity, from:reformatdate(from), to:reformatdate(till), featured:checked}
    const data = await sendFormData(params, 'api/post/add-offer', 'POST');
    if(data.code === 0){
        setLoading(false)
        Notiflix.Notify.success(`${data.message}`, {position: 'center-top'});
        addToOffers(data.response);
        setFile(null)
        setImageUrl(null)
        setFrom(null);
        setTill(null)
        setChecked(false)
        formik.resetForm()
    }
   }
    return(
        <>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        {imageUrl && <div className='edit-image'><Image src={imageUrl} className="edit-image-img" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="create offer" fill /></div>}
           <div className={styles.radios}>
                <RadioButtons value={value} setValue={setValue}/>
           </div>
            <div className={styles.offerImg}>
                <label>Select Offer/Coupon picture</label>
                <SelectImage setFile={setFile} file={file} setImageUrl={setImageUrl} text="Select picture" />
            </div>
           <div className={styles.formFlex}>
                <div className={styles.formGroup}>
                    <label>Offer/Coupon Name</label>
                    <Input size="sm" type="text"  {...formik.getFieldProps('name')} />
                </div>
                <div className={styles.formGroup}>
                    <label>Offer/Coupon Discount</label>
                    <Input  size="sm" type="number" value={formik.values.discount} {...formik.getFieldProps('discount')} />
                </div>
           </div>
                
           <div className={styles.formFlex}>
                <div className={styles.formGroup}>
                    <label>Offer/Coupon Valid From</label>
                    <DateInput size="sm" placeholder="Pick a start date" value={from} onChange={setFrom} />
                </div>
                <div className={styles.formGroup}>
                    <label>Offer/Coupon Valid Till</label>
                    <DateInput size="sm" placeholder="Pick an end date" value={till} onChange={setTill} />
                </div>
           </div>
                
            {value === 'COUPON' && 
            <Input.Wrapper label="Number of Coupons" withAsterisk>
                <Input type="number"  value={formik.values.quantity} {...formik.getFieldProps('quantity')} />
            </Input.Wrapper>}
            <RadioButton setChecked={setChecked} checked={checked} text="Offers/Coupon" />
            <Button type="submit" fullWidth size="md" leftIcon={<i class="ri-upload-2-line"></i>} disabled={loading ? true : false}  >{loading ? <span>Uploading<Loader variant="dots" /></span>: 'Upload' }</Button>
        </form>
        </>
    )
}