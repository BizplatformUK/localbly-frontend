import Modal from "../../../components/Reusable/Modal";
import AddSubCategory from './AddSubcategory'
import { useState } from "react";
import MediumModal from "../../../components/Reusable/Modal";
import { Card, Title, Text, Avatar } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { SubcategoryProvider } from "../contexts/SubcategoryContext";
export default function SubcategoryCard(){
    const [opened, { open, close }] = useDisclosure(false);
    return(
        <SubcategoryProvider>
            <Card padding="lg" withBorder radius="md"  onClick={open} sx={{backgroundColor: '#e5fffc'}} className="card">
                <Avatar color="dark" radius="xl"><i className="ri-add-line"></i></Avatar>
                <Title order={4} sx={{paddingTop: '1rem'}}>Add New</Title>
                <Text fz="sm">Sub-category</Text>
           </Card>
           <MediumModal opened={opened} close={close} text='Add New Category'>
                <AddSubCategory/>
            </MediumModal>
        </SubcategoryProvider>
    );
}