import { SubcategoryProvider } from "../features/Subcategories/contexts/SubcategoryContext";
import { Title, Text } from '@mantine/core';
import Layout from '../components/ui/Layout';
import dynamic from 'next/dynamic';
export default function Subcategories(){
    const DynamicCreatesubcategory = dynamic(() => import("../features/Subcategories/components/AddSubcategory"),{ ssr: false });
    const DynamicAddNew = dynamic(() => import("../components/Reusable/AddNew"),{ ssr: false });
    const DynamicSubcategoryList = dynamic(() => import("../features/Subcategories/components/Subcategorylist"),{ ssr: false });
    return(
        <SubcategoryProvider>
                <Layout>
                <div className="top-title">
                    <div className="top-title-text">
                        <Title order={4}>Product</Title>
                        <Text fz="sm">Sub-Categories</Text>
                    </div>
                    <DynamicAddNew text="Sub-Categories"><DynamicCreatesubcategory /></DynamicAddNew>
                </div>
                <div className="list"><DynamicSubcategoryList /></div>
                </Layout>
        </SubcategoryProvider>
       
    );
}


