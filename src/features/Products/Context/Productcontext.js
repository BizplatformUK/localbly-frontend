import { createContext, useState} from "react";
import { getData} from "../../../utils/utilFunctions";
import { useDebouncedState, useCounter, useShallowEffect  } from '@mantine/hooks';
import Notiflix from "notiflix";

export const productsContext = createContext()

export function ProductsProvider({children}){
    const [count, handlers] = useCounter(1, { min: 1, max: 100});
    const [value, setValue] = useDebouncedState('', 200);
    const [products, setProducts] = useState();
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false)
    const [shop, setShop] = useState();
    const [filter, setFilter] = useState('All');
    const [opened, setOpened] = useState(false);
    const [ids, setIds] = useState([])
    const [editLoading, setEditLoading] = useState()

    const handleItemClick = (value) => {
        setFilter(value)
    };
   
        const fetchProducts = async()=> {
            setLoading(true)
            try{
                const products = await getData(`api/get/get-products?page=${count}&filter=${filter}`);
                setProducts(products.items)
                setTotalPages(products.totalPages)
                setLoading(false)
            }catch(error){
                console.log(error)
            }
        }

        const searchProducts = async()=> {
            setLoading(true)
            try{
                const products = await getData(`api/get/search-products?page=${count}&term=${value}`);
                setProducts(products.items);
                setTotalPages(products.totalPages)
                setLoading(false)
            }catch(error){
                console.log(error)
            }
        }

        useShallowEffect(() => {
            if(value.length > 1){
                searchProducts()
            }else{
                fetchProducts()
            }
        },[count,value, filter]);

        const getShop = async()=> {
            const shop = await getData('api/get/get-shop');
            setShop(shop)
        }

        const removeFeatured = async()=> {
            setEditLoading(true)
            const response = await fetch('api/delete/remove-product-featured', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({idsArr:ids})
            })
            const data = await response.json();
            if(data.code === 0){
                setIds([])
                data.items.forEach(item=> {
                    updateFeatured(item, false)
                })
                setEditLoading(false);
                Notiflix.Notify.success(`${data.message}`, {position: 'center-top'});
            }
        }

        const addFeatured = async()=> {
            setEditLoading(true)
            const response = await fetch('api/post/make-products-featured', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({idsArr:ids})
            })
            const data = await response.json();
            console.log(data);
            if(data.code === 0){
                setIds([])
                setEditLoading(false)
                Notiflix.Notify.success(`${data.message}`, {position: 'center-top'});
            }
        }

        const updateFeatured = (id, featured) => {
            const updatedList = products.map((product) => {
              if (product.id === id) {
                return { ...product, featuredHome:featured};
              }
              return product;
            });
            setProducts(updatedList);
        };
          

        const removeFromList = (id) => {
            const updatedList = products.filter((product) => product.id !== id);
            setProducts(updatedList);
        }

        const updateList = (product) => {
            setProducts((prevProducts) =>
            prevProducts.map((prevProduct) =>
                prevProduct.id === product.id ? product : prevProduct
            )
            );
        };

        const addtoList = (product)=> {
            setProducts([product, ...products])
        }

        const contextValue = {
            products,
            getShop,
            shop,
            addtoList,
            handlers,
            setValue,
            totalPages,
            value,
            count,
            loading,
            updateList,
            removeFromList,
            filter,
            setFilter,
            handleItemClick,
            opened,
            setOpened,
            ids,
            setIds,
            removeFeatured,
            addFeatured,
            editLoading
        }

    return(
        <productsContext.Provider value={contextValue}>
            {children}
        </productsContext.Provider>
    )
}