import { NavLink, Box } from "@mantine/core"
import Link from "next/link"
import { useRouter } from "next/router";
export default function NavLinks({handleRedirect}){
    const router = useRouter()
    const isLink = router.pathname;
    const open = isLink === '/categories' || isLink === '/subcategories' || isLink === '/collections' || isLink === '/products';
    return(
        <>
           <Box w={240}>
                <NavLink key="Home" active={isLink === '/dashboard' ? true : false} icon={<i className="ri-home-line"></i>}  onClick={handleRedirect} component={Link} href="/dashboard" label="Home" variant="filled" style={{borderRadius: '0.4rem'}} />
                <NavLink label="Products" defaultOpened={open}  icon={<i class="ri-price-tag-3-line"></i>} childrenOffset={26} >
                    <NavLink active={isLink === '/categories' ? true : false}  label="Product Categories" icon={<i class="ri-price-tag-2-line"></i>} component={Link} href="/categories" variant="filled" style={{borderRadius: '0.4rem'}} />
                    <NavLink active={isLink === '/subcategories' ? true : false}  label="Product Sub-Categories" icon={<i class="ri-list-check-2"></i>} component={Link} href="/subcategories" variant="filled" style={{borderRadius: '0.4rem'}} />
                    <NavLink active={isLink === '/collections' ? true : false}  label="Product Collections" icon={<i class="ri-settings-6-line"></i>} component={Link} href="/collections" variant="filled" style={{borderRadius: '0.4rem'}} />
                    <NavLink active={isLink === '/products' ? true : false}  label="Products" icon={<i class="ri-price-tag-fill"></i>} component={Link} href="/products" variant="filled" style={{borderRadius: '0.4rem'}} />
                </NavLink>
                <NavLink key="Offers" active={isLink === '/offers' ? true : false} onClick={handleRedirect} icon={<i className="ri-shopping-bag-2-fill"></i>} component={Link} href="/offers" label="Offers" variant="filled" style={{borderRadius: '0.4rem'}} />
                <NavLink key="Account" active={isLink === '/account' ? true : false} onClick={handleRedirect} icon={<i className="ri-user-settings-line"></i>} component={Link} href="/account" label="Account" variant="filled" style={{borderRadius: '0.4rem'}} />
                <NavLink key="Reviews" active={isLink === '/reviews' ? true : false} onClick={handleRedirect} icon={<i className="ri-star-line"></i>} component={Link} href="/reviews" label="Reviews" variant="filled" style={{borderRadius: '0.4rem'}} />
                <NavLink key="Clients" active={isLink === '/clients' ? true : false} onClick={handleRedirect} icon={<i className="ri-group-line"></i>} component={Link} href="/clients" label="Clients" variant="filled" style={{borderRadius: '0.4rem'}} />
                <NavLink key="Admins" active={isLink === '/admins' ? true : false} onClick={handleRedirect} icon={<i className="ri-group-line"></i>} component={Link} href="/admins" label="Admins" variant="filled" style={{borderRadius: '0.4rem'}} />
                <NavLink key="Services" active={isLink === '/services' ? true : false} onClick={handleRedirect} icon={<i className="ri-briefcase-line"></i>} component={Link} href="/services" label="Services" variant="filled" style={{borderRadius: '0.4rem'}} />
                <NavLink key="My Plan" active={isLink === '/plan' ? true : false} onClick={handleRedirect} icon={<i className="ri-bank-card-line"></i>} component={Link} href="/plan" label="My Plan" variant="filled" style={{borderRadius: '0.4rem'}} />
            </Box>

        </>
    )
}