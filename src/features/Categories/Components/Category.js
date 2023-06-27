
import { useContext } from 'react';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import AddToBanner from '../../../components/form/AddToBanner';
import { categoryContext } from '../context/categoriesContextApi';
import {Menu, Indicator, ActionIcon } from '@mantine/core';
import dynamic from 'next/dynamic';

export default function Category({id, name, slug, picture, featured, isPresent, date}){
    const DynamicMediumModal = dynamic(() => import("../../../components/Reusable/Modal"),{ ssr: false });
    const DynamicEditCategory = dynamic(() => import("./Editcategory"),{ ssr: false });
    const [opened, { open, close }] = useDisclosure(false);
    const category = {id, name, picture, slug, featured, isPresent}
    const {setEditLoading, removeFromFeatured, addtoFeatured} = useContext(categoryContext)
    return(
        <>
                    <td>
                        <div className='item-tr'>
                            <div className='item-image'>
                                <Image src={picture} alt={name} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill />
                                {featured || featured === 1 ? <Indicator inline label="featured" size="14" className='indicator' /> : '' }
                            </div>
                            <p>{name}</p>
                        </div>
                    </td>
                    <td className='td-action'>
                        <ActionIcon variant="light" color="blue" onClick={open}><i class="ri-edit-line"></i></ActionIcon>
                        <Menu withArrow  width={150} sx={{marginBlock: '0.7rem'}}>
                            <Menu.Target><ActionIcon  size="md" variant="light" color="blue"><i class="ri-more-2-line"></i></ActionIcon></Menu.Target>
                            <Menu.Dropdown>
                                <AddToBanner item={category} text="category/" setLoading={setEditLoading}/>
                                {!featured ? <Menu.Item onClick={() => addtoFeatured(id)}>Make Featured</Menu.Item> :
                                <Menu.Item onClick={()=>removeFromFeatured(id)}>Remove featured</Menu.Item>}
                            </Menu.Dropdown>
                        </Menu>
                    </td>
            {<DynamicMediumModal opened={opened} close={close}  text="Edit Category">
                {<DynamicEditCategory {...category} handleClose={close}/>}
            </DynamicMediumModal>}
        </>
    )
}