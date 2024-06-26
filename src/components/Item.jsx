import '../sass/item.scss'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { Oval } from 'react-loader-spinner';

const Item = () => {
    const { product } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const [item, setItem] = useState(null);


    const handleMinusClick = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handlePlusClick = () => {
        setQuantity(quantity + 1);
    };


    const getItem = async () => {
        try {
            const response = await fetch(`https://ecommerce-website3333-593ff35538d5.herokuapp.com/api/items`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const itemsData = await response.json();
                const item = itemsData.find((item) => item.name === product);
                setItem(item);
                setMainImageIndex(item.Items_img.findIndex((img) => img.is_main) ?? 0);
            } else {
                console.error('Error while getting all items:', result.statusText);
            }
        } catch (error) {
            console.error('Error while getting all items:', error);
        }
    };

    useEffect(() => {
        getItem();
    }, []);

    return (
        <>  {item ? (
            <div className='product-container'>
                <div className='item-gallery'>
                    <div className='main-picture'>
                        <img
                            className='img-main-picture'
                            src={item.Items_img[mainImageIndex].image_url}
                            alt="main_picture"
                        />
                    </div>
                    <div className='side-pictures'>
                        {item.Items_img.map((image, i) => (
                            <img
                                key={i}
                                className='img-side-pictures'
                                src={image.image_url}
                                onMouseOver={e => (setMainImageIndex(i))}
                                alt="coucou"
                            />
                        ))}
                    </div>
                </div>
                <div className='item-info'>
                    <h2 className='item-collection'>{item.collection.name}</h2>
                    <h1 className='item-title'>{item.name}</h1>
                    <span className='item-price'>€ {(item.price / 100).toFixed(2)}</span>
                    <hr className='item-hr' />
                    <p className='item-stock'>{item.stock} items left</p>
                    <div className='item-quantity'>
                        <button className='item-quantity-minus disable-hover' onClick={handleMinusClick}><FaMinus /></button>
                        <span>{quantity}</span>
                        <button className='item-quantity-plus disable-hover' onClick={handlePlusClick}><FaPlus /></button>
                    </div>
                    <button className='button-add-item'>add</button>
                    <p className='item-description'>{item.description}.</p>
                </div>
            </div>
        ) : (
            <div style={{display:'flex', justifyContent: 'center', marginTop:'50px'}}>
                <Oval
                    visible={true}
                    height="80"
                    width="80"
                    color="#e2725b"
                    secondaryColor="#f4c8bf"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass="loading-spinner"
                />
            </div>
        )}
        </>
    )
}

export default Item;