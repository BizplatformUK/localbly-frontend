import { useContext } from 'react'
import EditService from './EditServices'
import { useDisclosure } from '@mantine/hooks';
import MediumModal from '../../../components/Reusable/Modal';
import DeleteItem from '../../../components/form/Delete';
import { ServicesContext } from '../Contexts/ServicesContext';
import Image from 'next/image';
import {ActionIcon} from '@mantine/core';

export default function Service({id, name, price, description, picture }){
    const service = {id, name, price, description, picture}
    const [opened, { open, close }] = useDisclosure(false);
    const url = `api/delete/delete-service?id=${id}`
    const {removeFromServices} = useContext(ServicesContext)
    return(
        <>
                    <td>
                        <div className='item-tr'>
                            <div class="next-image">
                                <Image src={picture} alt={name} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill />
                            </div>
                            <p>{name}</p>
                        </div>
                    </td>
                    <td className='td-action'>
                        <ActionIcon variant="light" color="blue" onClick={open}><i class="ri-edit-line"></i></ActionIcon>
                        <DeleteItem removeItem={removeFromServices} url={url} text="Service"/>
                    </td>
            <MediumModal opened={opened} close={close}  text="Edit Offer/Coupons">
                <EditService {...service} handleClose={close}/>
            </MediumModal>
        </>
    )
}