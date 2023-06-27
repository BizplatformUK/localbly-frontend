import Layout from "../components/ui/Layout"
import Image from "next/image"
import Link from "next/link"
export default function Upgrade(){
    return(
        <Layout>
            <div className="upgrade-account">
                <div className="upgrade-img"><Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src="/icons/not-allowed.svg" alt="offer access" /></div>
                <h2>Upgrade Account</h2>
                <p>Sorry!You need to upgrade your account to access this page</p>
                <Link href="#" className="upgrade-btn">Upgrade</Link>
            </div>
        </Layout>
    )
}