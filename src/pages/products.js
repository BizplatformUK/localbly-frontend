import { useState } from "react";
import { ProductsProvider } from "../features/Products/Context/Productcontext";
import Link from "next/link";
import AddProductForm from "../features/Products/components/Create/AddProduct";
import { useDisclosure } from '@mantine/hooks';
import { Title, Text, Modal, Button, Group } from "@mantine/core";
import Layout from "../components/ui/Layout";
import ProductList from "../features/Products/components/ui/Productlist";
export default function Products(){
    const [opened, { open, close }] = useDisclosure(false);
    return(
        <ProductsProvider>
            <Layout>
                <div className="top-title">
                        <div className="top-title-text">
                            <Title order={4}>Shop</Title>
                            <Text fz="sm">Products</Text>
                        </div>
                        <Button size="md" leftIcon={<i class="ri-add-line"></i>} onClick={open}>Add New</Button>
                </div>
                <div className="list">
                    {<ProductList />}
                </div>
                <Modal
                    opened={opened}
                    onClose={close}
                    title="Add New Products"
                    size="auto"
                    transitionProps={{ transition: 'fade', duration: 200 }}
                >
                    <AddProductForm />
                </Modal>
            </Layout>
        </ProductsProvider>
    );
}

