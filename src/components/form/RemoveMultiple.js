import { Button, Loader, Text } from "@mantine/core";
import { useState } from "react";
import Notiflix from 'notiflix';
export default function RemoveMultiple({ids, url, removeFromList}){
    const arrLength = ids.length >= 1;
    const [loading, setLoading] = useState(false)
    const handleDelete = async()=> {
        setLoading(true)
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({idsArr:ids})
        })
        const data = await response.json();
        console.log(data);
        //const deleted = data.itemIds.length;
        /*if(data.code === 0){
            data.itemIds.forEach(single => {
                removeFromList(single)
            });
            setLoading(false)
            Notiflix.Notify.success(`${deleted} items deleted`, {position: 'center-top'});
        }*/
    }
    return(
        <>
        {
            arrLength && 
            <div className="multiple-top">
                <div className="remove-many">
                    <Text fz="md">{ids.length} Selected</Text>
                    <Button leftIcon={<i class="ri-delete-bin-7-fill"></i>} disabled={loading} onClick={handleDelete} variant="light" color="red" size="md">
                        {loading ?  <Loader variant="dots" color="red" /> : 'Delete'}
                    </Button>
                </div>
            </div>
        }
        </>
    )
}