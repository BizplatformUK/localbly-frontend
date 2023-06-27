import Layout from "../components/ui/Layout";
import { Text, Title} from "@mantine/core";
import { BannerProvider } from "../context/BannerContext";
import dynamic from "next/dynamic";
import { getSession } from "next-auth/react";


export default function Profile(){
    const DynamicAddCategory = dynamic(() => import("../features/Categories/Components/AddCard"),{ ssr: false });
    const DynamicSubcategoryCard = dynamic(() => import("../features/Subcategories/components/AddCard"),{ ssr: false });
    const DynamicCollectionsCard = dynamic(() => import("../features/Collections/Components/CollectionsCard"),{ ssr: false });
    const DynamicOfferCard = dynamic(() => import("../features/Marketing/Components/OfferCard"),{ ssr: false });
    const DynamicBannerList = dynamic(() => import("../components/ui/Banner"), {ssr: false,});
    return (
       <BannerProvider>
              <Layout>
                <div className="mid-content">
                   <div className="main-title">
                        <Title order={3}>Hello,</Title>
                        {<Text fz="md"></Text>}
                    </div>
                    <div className="top-cards">
                        <DynamicAddCategory />
                        <DynamicSubcategoryCard />
                        <DynamicCollectionsCard />
                        <DynamicOfferCard />
                    </div>
                    <DynamicBannerList />
                </div>
            </Layout>
       </BannerProvider> 
    )
}

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
    const url = process.env.API_URL + `auth/fetch-shop?id=${session.id}`
    const response = await fetch(url);
    const shop = await response.json();
    if(shop.code == 4 && session.role === 'super-admin'){
        return{
            redirect:{
                destination:'/createshop',
                permanent:false
            }
        }
    }
    return {props: {session:session}}
}







