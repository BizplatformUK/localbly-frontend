

import { useState, useContext} from 'react';
import EditCollections from './EditCollection';
import { useDisclosure } from '@mantine/hooks';
import MediumModal from '../../../components/Reusable/Modal';
import AddToBanner from '../../../components/form/AddToBanner';
import { CollectionContext } from '../Contexts/CollectionContext';
import Image from 'next/image';
import AddToCollections from './AddProducts';
import { ActionIcon,Menu, Indicator} from '@mantine/core';
export default function Collection({id, name, slug, picture, featured, isPresent, date}){
    const [opened, { open, close }] = useDisclosure(false);
    const {addtoFeatured, removeFromFeatured,  setEditLoading}=useContext(CollectionContext)
    const collection = {id, name, slug, picture, featured, isPresent}


    return(
        <>

                        <td>
                            <div className='item-tr'>
                                <div class="item-image">
                                    <Image src={picture} alt={name} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill />
                                    {featured && <Indicator inline label="featured" size="14" className='indicator' /> }
                                </div>
                                <p>{name}</p>
                            </div>
                        </td>
                    <td className='td-action'>
                        <ActionIcon variant="light" color="blue" onClick={open}><i class="ri-edit-line"></i></ActionIcon>
                        <Menu withArrow  width={150} sx={{marginBlock: '0.7rem'}}>
                            <Menu.Target><ActionIcon  size="md" variant="light" color="blue"><i class="ri-more-2-line"></i></ActionIcon></Menu.Target>
                            <Menu.Dropdown>
                                <AddToBanner item={collection} text="collection/" setLoading={setEditLoading} />
                                {!featured ? <Menu.Item onClick={() => addtoFeatured(id)}>Make Featured</Menu.Item> :
                                <Menu.Item onClick={()=>removeFromFeatured(id)}>Remove featured</Menu.Item>}
                            </Menu.Dropdown>
                        </Menu>
                        <AddToCollections name={name} id={id} />
                    </td>

            <MediumModal opened={opened} close={close}  text="Edit Collection">
                <EditCollections {...collection} handleClose={close} />
            </MediumModal>
        </>
    )
}