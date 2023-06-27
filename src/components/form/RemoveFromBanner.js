import {Loader, Tooltip, ActionIcon} from "@mantine/core"
import Notiflix from "notiflix";
import { useState } from "react";

export default function RemoveFromBanner({id, removeItem}){
    const [loading, setLoading] = useState(false)
    
    async function removefrombanner(){
        setLoading(true);
        const params = {itemID:id}
        const response = await fetch(`api/delete/remove-from-banner`, {
            method: 'POST',
            headers: {'content-type': 'application/json',},
            body: JSON.stringify(params)
        });
        const result = await response.json()
        if(result.code === 0){
            removeItem(result.deletion);
            setLoading(false);
            Notiflix.Notify.success(`${result.message}`, {position: 'center-top'});
        }
    }
    return(
        <>
        <Tooltip label="remove from banner" color="red" withArrow>
            <ActionIcon variant="subtle" size="xl" color="red"  onClick={removefrombanner} >
                {loading ? <Loader variant="dots" /> : <i className="ri-delete-bin-7-fill"></i>}
            </ActionIcon>
        </Tooltip>
        </>
    )
}