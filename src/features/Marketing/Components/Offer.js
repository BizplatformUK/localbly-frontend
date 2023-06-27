import {useContext } from "react";
import { useDisclosure } from '@mantine/hooks';
import { ActionIcon, Title, Text, Indicator, Menu } from '@mantine/core';
import { MarketingContext } from "../contexts/MarketingContext";
import Image from "next/image";
import dynamic from "next/dynamic";

export default function Offer({id, name, slug, picture, type, discount, quantity,from,to, date, isPresent, featured}){
    const DynamicEditOffer = dynamic(() => import("./EditOffer"),{ ssr: false });
    const DynamicMediumModal = dynamic(() => import("../../../components/Reusable/Modal"),{ ssr: false });
    const DynamicAddToBanner = dynamic(() => import("../../../components/form/AddToBanner"),{ ssr: false });
    const DynamicAddToOffers = dynamic(() => import("./AddToOffers"),{ ssr: false });
    const DynamicRemovFromOffers = dynamic(()=> import('./RemoveFromoffers'), {ssr:false})
    const [opened, { open, close }] = useDisclosure(false);
    const offer = {id, name, picture, slug, type, discount, quantity,from,to, date, featured, isPresent}
    const {addtoFeatured, removeFromFeatured, setEditLoading} = useContext(MarketingContext)
    
    return(
        <>
                    <td>
                        <div className="item-tr">
                            <div className="item-image">
                                <Image src={picture} alt={name} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill />
                                {featured && <Indicator inline label="featured" size="14" className='indicator' /> }
                            </div>
                            <div>
                                <Title order={6}>{name}</Title>
                                <Text fz="sm">Offer Type: {type}</Text>
                            </div>
                        </div>
                    </td>
                    <td className="td-action">
                        <ActionIcon variant="light" color="blue" onClick={open}><i class="ri-edit-line"></i></ActionIcon>
                        <Menu withArrow  width={150} sx={{marginBlock: '0.7rem'}}>
                            <Menu.Target><ActionIcon  size="md" variant="light" color="blue"><i class="ri-more-2-line"></i></ActionIcon></Menu.Target>
                            <Menu.Dropdown>
                                <DynamicAddToBanner item={offer} text="offers/" setLoading={setEditLoading}/>
                                {!featured ? <Menu.Item onClick={() => addtoFeatured(id)}>Make Featured</Menu.Item> :
                                <Menu.Item onClick={()=>removeFromFeatured(id)}>Remove featured</Menu.Item>}
                            </Menu.Dropdown>
                        </Menu>
                        <DynamicAddToOffers  id={id} />
                        <DynamicRemovFromOffers id={id} slug={slug} />
                    </td>
            <DynamicMediumModal opened={opened} close={close}  text="Edit Offer/Coupons">
                <DynamicEditOffer {...offer} handleClose={close}/>
            </DynamicMediumModal>
        </>
    );
}