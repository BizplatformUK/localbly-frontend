import Modal from "../../../components/Reusable/Modal";
import Createcategory from "./Createcategory";
import { useState } from "react";
import MediumModal from "../../../components/Reusable/Modal";
import { useDisclosure } from '@mantine/hooks';
import { Card, Title, Text, Avatar } from "@mantine/core";
import { CategoryProvider } from "../context/categoriesContextApi";
export default function AddCategory(){
    const [opened, { open, close }] = useDisclosure(false);
    return(
        <CategoryProvider>
           <Card padding="lg" withBorder size="lg" radius="md" onClick={open} sx={{backgroundColor: '#fff7d2'}} className="card">
                <Avatar color="cyan" radius="xl"><i className="ri-add-line"></i></Avatar>
                <Title order={4} sx={{paddingTop: '1rem'}}>Add New</Title>
                <Text fz="sm">Category</Text>
           </Card>
           <MediumModal opened={opened} close={close} text='Add New Category'>
                <Createcategory/>
            </MediumModal>
        </CategoryProvider>
    );
}