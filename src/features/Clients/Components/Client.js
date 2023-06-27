

import { useState, useContext} from 'react';
import { useDisclosure } from '@mantine/hooks';
import { ClientsContext } from '../Contexts/ClientsContext';
import { ActionIcon} from '@mantine/core';
import Image from 'next/image';
import dynamic from 'next/dynamic';

export default function Client({id, name, logo}){
    const DynamicMediumModal = dynamic(() => import("../../../components/Reusable/Modal"),{ ssr: false });
    const DynamicDeleteItem = dynamic(() => import("../../../components/form/Delete"),{ ssr: false });
    const DynamicEditClient = dynamic(() => import("./EditClient"),{ ssr: false });
    const [opened, { open, close }] = useDisclosure(false);
    const {removeFromClients} = useContext(ClientsContext)
    const client  = {id, name, logo}
    const url = `api/delete/delete-client?id=${id}`
    return(
        <>
                    <td>
                            <div className='item-tr'>
                                <div class="next-image">
                                    <Image src={logo} alt={name} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill />
                                </div>
                                <p>{name}</p>
                            </div>
                    </td>
                    <td className='td-action'>
                        <ActionIcon variant="light" color="blue" onClick={open}><i class="ri-edit-line"></i></ActionIcon>
                        <DynamicDeleteItem removeItem={removeFromClients} url={url} text="Client"/>
                    </td>
            <DynamicMediumModal opened={opened} close={close}  text="Edit Collection">
               {<DynamicEditClient {...client} handleClose={close} />}
            </DynamicMediumModal>
        </>
    )
}