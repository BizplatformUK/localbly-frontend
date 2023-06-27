import SelectImage from '../../../components/form/selectImage';
import { useFormik } from "formik"
import { useState, useContext } from "react"
import RadioButton from "../../../components/form/RadioButton"
import Notiflix from "notiflix"
import Image from 'next/image';
import { Input, Button, Loader } from '@mantine/core';
import { categoryContext } from "../context/categoriesContextApi"
import { sendFormData, sendImageData, } from '../../../utils/utilFunctions';

export default function EditCategory({id, name, picture, featured, handleClose}){
    const [checked, setChecked] = useState(featured)
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false)
    const {updateCategory} = useContext(categoryContext)
    const formik = useFormik({
        initialValues: {
            id:id,
            category:name,
            featured:featured
        },
        onSubmit: handleSend
    })
 
    async function handleSend(values){
        setLoading(true)
        const imageUrl = file ? await sendImageData('categories', file) : null;
        const params = {catId:values.id, name:values.category, image:imageUrl || picture, featured:checked}
        const cat = await sendFormData(params, 'api/post/edit-category', 'POST')
        if(cat.code == 0){
            updateCategory(cat.response);
            handleClose()
            Notiflix.Notify.success(`${cat.message}`, {position: 'center-top'});
        }
    }
    return(
        <>
            <form  onSubmit={formik.handleSubmit}>
                <div className='edit-image'><Image src={imageUrl ? imageUrl : picture} className="edit-image-img" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt={name} fill /></div>
                <label>Category Picture</label>
                <SelectImage setFile={setFile} file={file} setImageUrl={setImageUrl} text="Select Image" />
                <div className='form-group'>
                    <label for="category">Name of Category</label>
                    <Input placeholder="Your email" value={formik.values.category} {...formik.getFieldProps('category')} />
                </div>
                <RadioButton setChecked={setChecked} checked={checked} text="Category" />
                <div className="del-buttons">
                    <Button type="submit" size="md" leftIcon={<i class="ri-edit-line"></i>} disabled={loading ? true : false}>{loading ? <span>Editing<Loader variant="dots" /></span> : 'Edit Category'}</Button>
                    <Button type="button" size="md" variant="light" color="blue" leftIcon={<i class="ri-close-line"></i>} onClick={handleClose}>Cancel</Button>
                </div>
            </form>
        </>
    )
}