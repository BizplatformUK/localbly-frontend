
import { CategoryProvider } from "../features/Categories/context/categoriesContextApi";
import {Title, Text } from "@mantine/core";
import Layout from '../components/ui/Layout'
import dynamic from "next/dynamic";
export default function Categories(){
    const DynamicCreatecategory = dynamic(() => import("../features/Categories/Components/Createcategory"),{ ssr: false });
    const DynamicAddNew = dynamic(() => import("../components/Reusable/AddNew"),{ ssr: false });
    const DynamicCategorylist = dynamic(() => import("../features/Categories/Components/Categorylist"),{ ssr: false });
    return(
 
            <CategoryProvider>
                <Layout>
                    <div className="top-title">
                        <div className="top-title-text">
                            <Title order={4}>Product</Title>
                            <Text fz="sm">Categories</Text>
                        </div>
                        <DynamicAddNew text="Category"><DynamicCreatecategory /></DynamicAddNew>
                    </div>
                    <div className="category_list">
                        <DynamicCategorylist />
                    </div>
                </Layout>
            </CategoryProvider>
      
    );
}

/*
export async function getServerSideProps({req}){
    const session = await getSession({req})
    if(!session){
        return{
            redirect:{
                destination:'/login',
                permanent:false
            }
        }
    }
    const url = `api/get/get-categories`
    const response = await fetch(url);
    const data = await response.json()
    return{
        props:{categories:data}
    }
}*/












