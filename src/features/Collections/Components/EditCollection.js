import SelectImage from "../../../components/form/selectImage"
import { useState, useContext } from "react"
import { useFormik } from "formik"
import { Input, Button, Loader } from "@mantine/core"
import RadioButton from "../../../components/form/RadioButton"
import Notiflix from "notiflix"
import Image from "next/image"
import { CollectionContext } from "../Contexts/CollectionContext"
import { sendFormData, sendImageData, } from '../../../utils/utilFunctions';
export default function EditCollections({id, name, picture, featured, handleClose}){
    const [checked, setChecked] = useState(featured)
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false)
    const {updateCollection} = useContext(CollectionContext);
    
    const formik = useFormik({
        initialValues: {
            id:id,
            name,
            featured:featured
        },
        onSubmit: handleSend
    })

    async function handleSend(values){
        setLoading(true)
        const imageUrl = file ? await sendImageData('collections', file) : null;
        const params = {colId:id, name:values.name, image: imageUrl || picture, featured:checked};
        const cat = await sendFormData(params, 'api/post/edit-collection', 'POST')
        if(cat.code == 0){
            setLoading(false);
            updateCollection(cat.response);
            handleClose()
            Notiflix.Notify.success(`${cat.message}`, {position: 'center-top'});
        }
    }
    return(
        <>
            <form  onSubmit={formik.handleSubmit}>
            <div className='edit-image'><Image src={imageUrl ? imageUrl : picture} className="edit-image-img" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt={name} fill /></div>
                <label>Collection Picture</label>
                <SelectImage setFile={setFile} file={file} setImageUrl={setImageUrl} text="Select Image" />
                <div className='form-group'>
                    <label htmlFor="name">Name of Collection</label>
                    <Input id="name" size="md" placeholder='Collection name'  name="name" value={formik.values.name} {...formik.getFieldProps('name')} />
                </div>
                <RadioButton setChecked={setChecked} checked={checked} text="Collection" />
                <div className="del-buttons">
                    <Button type="submit" size="md" leftIcon={<i class="ri-edit-line"></i>} disabled={loading ? true : false}>{loading ? <span>Editing<Loader variant="dots" /></span> : 'Edit Collection'}</Button>
                    <Button type="button" size="md" variant="light" color="blue" leftIcon={<i class="ri-close-line"></i>} onClick={handleClose}>Cancel</Button>
                </div>
            </form>
        </>
    )
}