import SelectImage from '../../../components/form/selectImage';
import { useFormik } from "formik"
import { useState, useContext } from "react"
import Notiflix from "notiflix"
import { Input, Button, Loader } from '@mantine/core';
import Image from 'next/image';
import { ClientsContext } from '../Contexts/ClientsContext';
import { sendFormData, sendImageData, } from '../../../utils/utilFunctions';
export default function EditClient({id, name, logo, handleClose}){
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false)
    const {updateClients} = useContext(ClientsContext)
    const formik = useFormik({
        initialValues: {client:name},
        onSubmit: handleSend
    })
    async function handleSend(values){
        setLoading(true)
        const imageUrl = file ? await sendImageData('clients', file) : null;
        const params = {clientId:id, name:values.client, logo:imageUrl || logo}
        const cat = await sendFormData(params, 'api/post/edit-client', 'POST')
        if(cat.code == 0){
            updateClients(cat.response);
            handleClose()
            Notiflix.Notify.success(`${cat.message}`, {position: 'center-top'});
        }
    }
    return(
        <>
            <form  onSubmit={formik.handleSubmit}>
                <Image src={imageUrl ? imageUrl : logo} width={200} height={100} alt={name}/>
                <label>Client Logo</label>
                <SelectImage setFile={setFile} file={file} setImageUrl={setImageUrl} text="Change Logo" />
                <div className='form-group'>
                    <label for="category">Name of Client</label>
                    <Input value={formik.values.client} {...formik.getFieldProps('client')} />
                </div>
                <div className="del-buttons">
                    <Button type="submit" size="md" leftIcon={<i class="ri-edit-line"></i>} disabled={loading ? true : false}>{loading ? <span>Editing<Loader variant="dots" /></span> : 'Edit Client'}</Button>
                    <Button type="button" size="md" variant="light" color="blue" leftIcon={<i class="ri-close-line"></i>} onClick={handleClose}>Cancel</Button>
                </div>
            </form>
        </>
    )
}