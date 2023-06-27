import Layout from '../components/ui/Layout'
import { MarketingProvider } from '../features/Marketing/contexts/MarketingContext'
import { Title, Text } from '@mantine/core'
import { getSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
export default function Offers(){
    const DynamicAddnew = dynamic(() => import("../components/Reusable/AddNew"),{ ssr: false });
    const DynamicOfferList = dynamic(() => import("../features/Marketing/Components/OfferList"),{ ssr: false });
    const DynamicCreateOffer = dynamic(() => import("../features/Marketing/Components/CreateOffer"),{ ssr: false });
    return(
        <MarketingProvider>
                <Layout>
                    <div className="top-title">
                        <div className="top-title-text">
                            <Title order={4}>Product</Title>
                            <Text fz="sm">Offers/Coupons</Text>
                        </div>
                        <DynamicAddnew text="Offers/Coupons"><DynamicCreateOffer /></DynamicAddnew>
                    </div>
                    <DynamicOfferList />
                </Layout>
        </MarketingProvider>
        
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
    if(shop.version == 'Free Trial'){
        return{
            redirect:{
                destination:'/upgrade',
                permanent:false
            }
        }
    }
    return {props: {session:session}}
}