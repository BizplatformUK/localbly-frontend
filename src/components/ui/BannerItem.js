import {Title, Checkbox } from '@mantine/core';
import RemoveFromBanner from '../form/RemoveFromBanner';
import { useContext, useState } from 'react';
import { BannerContext } from '../../context/BannerContext';
import Image from 'next/image';
export default function BannerItem({id, name, slug, itemID, image, link, value, setValue}){
    const {removefromList} = useContext(BannerContext);
    const isChecked = value.includes(id)
    return(
        <>
            <td>
                <Checkbox.Group value={value} onChange={setValue}>
                    <label>
                        <Checkbox value={id} checked={isChecked} />
                        <div className='item-tr'>
                            <div className='item-image'><Image src={image} alt={name} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill /></div>
                            <p>{name}</p>
                        </div>
                    </label>
                </Checkbox.Group>
            </td>
            <td>
                <RemoveFromBanner id={itemID} removeItem={removefromList} />
            </td>
        </>
    )
    
}