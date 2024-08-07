import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../sass/items.scss'


function Items() {
    const [items, setItems] = useState([]);
    const productTypes = ['Plate', 'Cup'];

    const getRandomProductType = () => {
        const randomIndex = Math.floor(Math.random() * productTypes.length);
        return productTypes[randomIndex];
    };

    const [productType, setProductType] = useState(getRandomProductType);
    const navigate = useNavigate();
    const redirectToDetails = (item) => {
        navigate(`/products/${item.name}`);
    }; 

    const getItems = async () => {
        try {
            const response = await fetch(`https://ecommerce-website3333-593ff35538d5.herokuapp.com/api/items`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (response.ok) {
                const itemsData = await response.json();
                return setItems(itemsData.Objets);
            } else {
                console.error('Error while getting all items:', result.statusText);
            }
        } catch (error) {
            console.error('Error while getting all items:', error);
        }
    };

    useEffect(() => {
        getItems();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setProductType(getRandomProductType());
        }, 120000); // 2 minutes in milliseconds or each 2 days (172800000 in milliseconds) or 2592000000 (1 month = 30 days in milliseconds) or each week 604800000 (1 week in milliseconds)

        return () => clearInterval(interval); // When a component is removed from the DOM, 
                                             //any intervals or timeouts set by that component will continue to run unless explicitly cleared.
    }, []);

    // Filter items to get only those with the current product_type
    const filteredItems = items.filter(item => item.product_type === productType);

    return (
        <>  
            <h1>Discover {productType}</h1>
            <div className='items-container'>
                {filteredItems.slice(0, 3).map((item) => (
                    <div className='item' key={item.id}>

                        <div className='item-picture' onClick={() => redirectToDetails(item)} style = {{ backgroundImage: `url(${item.Items_img.find(img => !img.is_main)?.image_url})`}}
                            onMouseEnter={ e => e.target.style.backgroundImage =`url(${item.Items_img.find(img => img.is_main)?.image_url})` }
                            onMouseLeave={ e => e.target.style.backgroundImage =`url(${item.Items_img.find(img => !img.is_main)?.image_url})` }
                        ></div>                    

                        <div className='all-info'>
                            <Link to={`/products/${item.name}`} className='info'>{item.name}</Link>
                            <p className='info'>{'€'+item.price/100}</p>
                        </div>
                    </div>
                /*  <div className='item'>
                        <div className='item-picture'></div>
                        <div className='all-info'>
                            <p className='info'>Name 1</p>
                            <p className='info'>€38,00</p>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='item-picture'></div>
                        <div className='all-info'>
                            <p className='info'>Name 1</p>
                            <p className='info'>€38,00</p>
                        </div>
                    </div> */
                ))}
            </div>
        </>
    )
}

export default Items;