import { Button, Input, Menu, Loader } from "@mantine/core"
import { useState } from "react";
import Notiflix from "notiflix";
import { sendFormData } from "../../utils/utilFunctions";
export default function AddToBanner({item, text, setLoading}){
    const url = 'localblyshops.azurewebsites.net/';
    async function addToBanner(){
        setLoading(true)
        const params = {name:item.name, slug:item.slug, image:item.picture, itemID:item.id, link:url+text+item.slug}
        const response = await sendFormData(params, 'api/post/add-to-banner', 'POST');
        console.log(response)
        if(response.code === 0){
            setLoading(false)
            //additem(item.id)
            Notiflix.Notify.success(`${response.message}`, {position: 'center-top'});
        }
    }

    async function removeFromBanner(){
        const params = {itemID:item.id};
        const response = await sendFormData(params, 'api/delete/remove-from-banner', 'POST');
        if(response.code === 0){
            setLoading(false);
            Notiflix.Notify.success(`${response.message}`, {position: 'center-top'});
        }
    }
    return(
        <>
          {!item.isPresent ? <Menu.Item onClick={addToBanner}>Add to Banner</Menu.Item> : <Menu.Item onClick={removeFromBanner}>Remove from Banner</Menu.Item> }
        </>
    )
}