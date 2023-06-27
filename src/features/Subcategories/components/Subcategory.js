import { useDisclosure } from '@mantine/hooks';
import {Tooltip, ActionIcon} from "@mantine/core";
import Image from "next/image";
import dynamic from "next/dynamic";
export default function Subcategory({id, category, name, picture, categoryID, ids, setIds}){
    const DynamicMediumModal = dynamic(() => import("../../../components/Reusable/Modal"),{ ssr: false });
    const DynamicEditSubcategory = dynamic(() => import("./Editsubcategory"),{ ssr: false });
    const subcat = {id, category, name, picture, categoryID}
    const [opened, { open, close }] = useDisclosure(false);
    const isChecked = ids.includes(id);
    
    return(
        <>
                    <td>
                         <div className="item-tr">
                            <div class="item-image"><Image src={picture} alt={name} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill /></div>
                            <p>{name}</p>
                        </div>
                    </td>
                    <td className="td-action">
                        <Tooltip withArrow label="edit category"><ActionIcon variant="subtle" size="xl" color="blue" onClick={open}><i class="ri-edit-line"></i>Edit</ActionIcon></Tooltip>
                    </td>
        <DynamicMediumModal opened={opened} close={close} text='Edit Product Category'>
            <DynamicEditSubcategory {...subcat} handleClose={close}/>
        </DynamicMediumModal>
        </>
    )
}