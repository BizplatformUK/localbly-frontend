import Layout from '../components/ui/Layout'
import Breadcrumbs from '../components/ui/Breadcrumb'
import { getSession } from 'next-auth/react'
export default function Reviews(){
    return(
        <Layout>
            <Breadcrumbs text="Reviews" />
            <h2>Reviews</h2>
        </Layout>
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
    const url = `https://localblyapp.azurewebsites.net/shops/fetch-shop?id=${session.id}`
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