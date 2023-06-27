import Layout from '../components/ui/Layout'
import ClientList from '../features/Clients/Components/ClientList'
import { ClientsProvider } from '../features/Clients/Contexts/ClientsContext'
import { Title, Text } from '@mantine/core'
import { getSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
export default function Clients(){
    const DynamicAddNew = dynamic(() => import("../components/Reusable/AddNew"),{ ssr: false });
    const DynamicAddClient = dynamic(() => import("../features/Clients/Components/AddClient"),{ ssr: false });
    return (
        <ClientsProvider>
            <Layout>
                <div className="top-title">
                    <div className="top-title-text">
                        <Title order={4}>Our</Title>
                        <Text fz="sm">Clients</Text>
                    </div>
                    <DynamicAddNew text="Collections"><DynamicAddClient /></DynamicAddNew>
                </div>
                <ClientList />
            </Layout>
        </ClientsProvider>
        
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