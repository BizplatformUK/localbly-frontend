import Layout from "../components/ui/Layout"
import { getSession } from "next-auth/react"
import dynamic from "next/dynamic"
import { Title, Text } from "@mantine/core"
import { ServicesProvider } from "../features/Services/Contexts/ServicesContext"
import ServicesList from "../features/Services/Components/ServicesList"


export default function Services(){
    const DynamicAddNew = dynamic(() => import("../components/Reusable/AddNew"),{ ssr: false });
    const DynamicCreateService = dynamic(() => import("../features/Services/Components/CreateService"),{ ssr: false });
    return(
        <ServicesProvider>
            <Layout>
                <div className="top-title">
                    <div className="top-title-text">
                        <Title order={4}>Our</Title>
                        <Text fz="sm">Services</Text>
                    </div>
                    <DynamicAddNew text="Services"><DynamicCreateService /></DynamicAddNew>
                </div>
                <ServicesList />
            </Layout>
        </ServicesProvider>
        
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
    return {props: {session:session}}
}