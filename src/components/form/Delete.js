import { useState } from "react";
import MediumModal from "../Reusable/Modal";
import { deleteItem } from "../../utils/utilFunctions";
import Notiflix from "notiflix";
import { Alert, Button, Tooltip, ActionIcon, Loader, Modal} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Text } from '@mantine/core';

export default function DeleteItem({url, removeItem, text}){
    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = useState(false)

    const handleDelete = async()=> {
        setLoading(true)
        const send = await fetch(url)
        const response = await send.json()
        if(response.error){
            setLoading(false)
            Notiflix.Notify.failure(`${response.error}`, {position: 'center-top'});
            return;
        }
        removeItem(response.id)
        setLoading(false)
        close()
        Notiflix.Notify.success(`${response.message}`, {position: 'center-top'});
        
    }
    return(
        <>
            <Tooltip label={`delete ${text}`} withArrow color="red" ><ActionIcon variant="subtle" size="xl" onClick={open} color="red"><i class="ri-delete-bin-7-fill"></i></ActionIcon></Tooltip>
            <Modal opened={opened} onClose={close} >
                <div className="delete-category">
                    <Alert icon={<i class="ri-error-warning-line"></i>} title="Warning!" color="red">
                        <Text fz="md" color="red">Are you sure you want to delete this {text}</Text>
                    </Alert>
                    <div className="del-buttons">
                        <Button leftIcon={<i class="ri-delete-bin-line"></i>} onClick={()=>handleDelete()} size="md" color="red" disabled={loading ? true : false}>{loading ? <span>Deleting...  <Loader variant="dots" /></span> : 'Delete'}</Button>
                        <Button leftIcon={<i class="ri-close-line"></i>} onClick={close} variant="light" size="md" color="blue">Cancel</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}