import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';



export function useRequireAuth() {
  const { data:session, status } = useSession();
  const router = useRouter();
  const [shop, setShop] = useState()
  const [loading, setLoading] = useState()

  useEffect(() => {
   
    async function getshop(){
        setLoading(true)
        if (!session && status === 'unauthenticated') {
            router.push('/login'); // Redirect to login page if not logged in
        }
        const response = await fetch('/api/get/get-shop');
        const shop = await response.json();
        if(!shop && session.role === 'super-admin'){
            router.push('/createshop')
        }
        setShop(shop)
        setLoading(false)
    }
    getshop()
  }, [status, router]);

  return { session, status, shop, loading};
}
