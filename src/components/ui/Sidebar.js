import Link from 'next/link';
import { useState } from 'react';
import { CloseButton, NavLink, LoadingOverlay, Button } from '@mantine/core';
import { signOut } from "next-auth/react";
import links from '../../data/SidebarLinks';
import { useRouter } from 'next/router';
import Image from 'next/image';
import NavLinks from './NavLinks';

export default function Sidebar(){
    const [menu, setOpenMenu] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const handleRedirect = ()=> {
        setOpenMenu(false)
        setLoading(true)
    }

    const toggleMenu = ()=> {
        setOpenMenu(true)
    
    }
    const sidebarClassName = 'sidebar';
    const menuClassName = menu ? 'sidebar-show' : 'sidebar-hide';
    const fullClassName = `${sidebarClassName} ${menuClassName}`;
    return(
        <>
           {loading && <LoadingOverlay visible={loading} overlayBlur={4} className='loading-overlay' />}
            <div className='menu-logo'>
                <button className='btn-menu' onClick={toggleMenu}><i className="ri-menu-line"></i></button>
                {/*<div className='site-logo'><Image src="/logo.png" priority="true" placeholder={blur} fill alt="localbly logo"/></div>*/}
            </div>
            <div className='sidebar-menu'>
                        <div className={fullClassName}>
                            <CloseButton aria-label="Close modal" size="xl" onClick={()=>setOpenMenu(false)} className='btn-close' />
                                {/*links.map(item=> {
                                    const {text, icon, link} = item;
                                    const isLink = router.pathname === link;
                                    return (
                                        <NavLink key={text} icon={icon} component={Link} href={link} label={text} variant="filled" style={{borderRadius: '0.4rem'}}  active={isLink ? true : false} onClick={handleRedirect} />
                                    );
                                })*/}
                            <NavLinks handleRedirect={handleRedirect} />
                            <div className="bottom-links">
                                <NavLink component={Link} href="/support" icon={<i className="ri-customer-service-2-line"></i>} variant="filled" label="Support" style={{borderRadius: '0.4rem'}} onClick={handleRedirect}  />
                                <NavLink component={Button} onClick={signOut} icon={<i className="ri-logout-box-r-line"></i>} variant="filled" label="Log-out" style={{borderRadius: '0.4rem'}} />
                            </div>
                    </div>
            </div>
   
        </>
    );
}