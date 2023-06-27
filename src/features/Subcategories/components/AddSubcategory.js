import SelectImage from "../../../components/form/selectImage";
import { useState, useContext } from "react";
import Notiflix from "notiflix";
import Image from "next/image";
import { Button, Input, Loader } from "@mantine/core";
import { sendFormData, sendImageData, } from '../../../utils/utilFunctions';
import { SubcategoryContext } from "../contexts/SubcategoryContext";
import {useSetState, useDebouncedState } from '@mantine/hooks';
import CategoryDropdown from "../../../components/Reusable/CategoryDropdown";
export default function Createsubcategory(){
   const[loading, setLoading] = useState(false);
   const [file, setFile] = useState(null);
   const [imageUrl, setImageUrl] = useState(null);
   const [state, setState] = useSetState({ catId: '', name: ''});
   const {addSubcategoriesToList} = useContext(SubcategoryContext)
   const [value, setValue] = useDebouncedState('', 200);

    async function handleSend(e) {
        e.preventDefault()
        setLoading(true)
        const imageUrl = await sendImageData('subcategories', file)
         const params = {catId:state.catId, name:value, image:imageUrl}
         const data = await sendFormData(params, 'api/post/add-subcategory', 'POST');
         if(data.code == 3){
             setLoading(false)
             Notiflix.Notify.failure(`${data.error}`, {position: 'center-top'});
             return;
         }
        setLoading(false)
        setFile(null)
        setImageUrl(null)
        setState({ catId: '', name: ''})
        setValue('');
        addSubcategoriesToList(data.response);
        Notiflix.Notify.success(`${data.message}`, {position: 'center-top'});
     }
    return(
        <>
        <form onSubmit={handleSend} encType="multipart/form-data">
            {imageUrl && <div className='edit-image'><Image src={imageUrl} className="edit-image-img" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt={name} fill /></div>}
             <label>Sub-Category Picture</label>
             <SelectImage setFile={setFile} file={file} setImageUrl={setImageUrl} text="Select picture" />
             <div className="form-group">
                <label>Sub-Category Name</label>
                <Input name="subcategory" size="md" id="subcategory" placeholder="Subcategory Name" value={value}  onChange={(event) => setValue(event.currentTarget.value)}  />
             </div>
             <CategoryDropdown setState={setState} state={state} />
            <Button type="submit" fullWidth size="md" sx={{marginTop:'1rem'}} leftIcon={<i class="ri-upload-2-line"></i>} disabled={loading ? true : false}  >{loading ? <span>Uploading<Loader variant="dots" /></span>: 'Upload' }</Button>
        </form>
        </>
    );
}