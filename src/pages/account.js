import Layout from "../components/ui/Layout"
import Breadcrumbs from "../components/ui/Breadcrumb"
import GlobalTabs from '../components/Reusable/GlobalTabs'
import Profile from "../features/Profile/components/ui/Profile"
import ChangePassword from "../features/Profile/components/ui/ChangePassword"
import MyProfile from "../features/Profile/components/ui/MyProfile"
import { ProfileProvider } from "../features/Profile/contexts/ProfileContext"
import {getSession} from "next-auth/react";
import AccessDenied from "../components/ui/AccessDenied"


export default function Account({data}){
    const isAdmin =  data.session.role === 'admin'

    return(
        <ProfileProvider>
            <Layout>
                <GlobalTabs>
                   {<GlobalTabs.Tab label="Shop Details" value="profile">
                         {isAdmin ? <AccessDenied /> : <Profile  shop={data.shop}/>}
                    </GlobalTabs.Tab>}
                    <GlobalTabs.Tab label="Change Password" value="change password"><ChangePassword /></GlobalTabs.Tab>
                    <GlobalTabs.Tab label="My Profile" value="my profile"><MyProfile /></GlobalTabs.Tab>
                </GlobalTabs>
            </Layout>
        </ProfileProvider>
        
    )
}

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx)
    const response = await fetch(process.env.API_URL + `auth/get-single-shop/${session.id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN
        },
    })
    const shop = await response.json()
    return {props: {data: {session, shop}}
    }
}