import Layout from '../components/ui/Layout'
import Breadcrum from '../components/ui/Breadcrumb'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import PlanCard from '../features/Profile/components/ui/PlanCard'
import { getSession } from 'next-auth/react'
import Billing from '../features/Profile/components/form/Billing'
export default function MyPlan({shop}){
    return(
        <Layout>
            <Breadcrum text="My Plan" />
            <PlanCard shop={shop} />
            <Billing />
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
    const url = process.env.API_URL + `auth/fetch-shop?id=${session.id}`
    const response = await fetch(url);
    const shop = await response.json()
    return {props: {shop:shop}}
}