import { CollectionProvider } from "../features/Collections/Contexts/CollectionContext";
import { Title, Text } from "@mantine/core";
import Layout from '../components/ui/Layout'
import dynamic from "next/dynamic";
export default function Collections(){
    const DynamicCollectionsList = dynamic(() => import("../features/Collections/Components/CollectionList"),{ ssr: false });
    const DynamicAddNew = dynamic(() => import("../components/Reusable/AddNew"),{ ssr: false });
    const DynamicCreateCollection = dynamic(() => import("../features/Collections/Components/CreateCollection"),{ ssr: false });
    return(
        <CollectionProvider>
            <Layout>
                <div className="top-title">
                    <div className="top-title-text">
                        <Title order={4}>Product</Title>
                        <Text fz="sm">Collections</Text>
                    </div>
                    <DynamicAddNew text="Collections"><DynamicCreateCollection /></DynamicAddNew>
                </div>
                <div><DynamicCollectionsList /></div>
            </Layout>
        </CollectionProvider>
    );
}