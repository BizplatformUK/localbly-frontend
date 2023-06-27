import { useContext, useState} from "react";
import { SubcategoryContext } from "../contexts/SubcategoryContext";
import { Button, Loader, Input } from "@mantine/core";
import {useSetState, useDebouncedState } from '@mantine/hooks';
import SelectImage from "../../../components/form/selectImage";
import Notiflix from "notiflix";
import Image from "next/image";
import CategoryDropdown from "../../../components/Reusable/CategoryDropdown";
import { sendFormData, sendImageData } from "../../../utils/utilFunctions";

export default function EditSubcategory({id, name, category, picture, categoryID, handleClose}){
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false)
    const [state, setState] = useSetState({ catId: categoryID, name: category});
    const [value, setValue] = useDebouncedState(name, 200);
    const {updateSubcategories} = useContext(SubcategoryContext)
    
    async function handleSend(e){
        e.preventDefault()
        setLoading(true)
        const imageUrl = file ? await sendImageData('subcategories', file) : null;
        const params = {subId:id, catId:state.catId, name:value, image:imageUrl || picture}
        const cat = await sendFormData(params, 'api/post/edit-subcategory', 'POST');
        if(cat.code === 3){
            setLoading(false)
            Notiflix.Notify.failure(`${cat.error}`, {position: 'center-top'}); 
            return;
        }
        setLoading(false)
        updateSubcategories(cat.response);
        handleClose()
        Notiflix.Notify.success(`${cat.message}`, {position: 'center-top'});
    }
    return(
        <>
        <form onSubmit={handleSend}>
            <div className='edit-image'><Image src={imageUrl ? imageUrl : picture} className="edit-image-img" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt={name} fill /></div>
            <label>Sub-Category Picture</label>
            <SelectImage setFile={setFile} file={file} setImageUrl={setImageUrl} text="Change Image" />
            <div className='form-group'>
                <label htmlFor="category">Name of Sub-category</label>
                <Input id="category" size="md"  name="subcategory" value={value} onChange={(event) => setValue(event.currentTarget.value)} />
            </div>
            <CategoryDropdown setState={setState} state={state} />
            <div className="del-buttons">
                <Button type="submit" size="md" leftIcon={<i class="ri-edit-line"></i>} disabled={loading ? true : false}>{loading ? <span>Editing<Loader variant="dots" /></span> : 'Save Changes'}</Button>
                <Button type="button" size="md" variant="light" color="blue" leftIcon={<i class="ri-close-line"></i>} onClick={handleClose}>Cancel</Button>
            </div>
        </form>
        </>
    )
}