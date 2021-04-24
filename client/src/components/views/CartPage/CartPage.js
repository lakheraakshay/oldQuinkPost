import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {
    getCartItems,
    removeCartItem,
} from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';
import Skeleton from '@material-ui/lab/Skeleton';
import '../Originals/ArticleFeed.css';
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import { Link } from "react-router-dom";

function CartPage(props) {
    const dispatch = useDispatch();
    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)

    useEffect(() => {

        let cartItems = [];
        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                });
                dispatch(getCartItems(cartItems, props.user.userData.cart))
                    .then((response) => {
                        if (response.payload.length > 0) {
                            calculateTotal(response.payload)
                        }
                    })
            }
        }

    }, [props.user.userData])

    const calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.map(item => {
            total += parseInt(item.price, 10) * item.quantity
        });

        setTotal(total)
        setShowTotal(true)
    }


    const removeFromCart = (productId) => {

        dispatch(removeCartItem(productId))
            .then((response) => {
                if (response.payload.cartDetail.length <= 0) {
                    setShowTotal(false)
                } else {
                    calculateTotal(response.payload.cartDetail)
                }
            })
    }
    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1 className='articleFeed-title'>Saved Content</h1>
            <Link to="/">
                <div style={{ position: 'absolute', top: '56px', right: '40px', backgroundColor: 'rgba(0, 0, 0, 0.164)', padding: '12px', borderRadius: '27px', color: 'black'}}>
                <HomeRoundedIcon />
                </div>
            </Link>
            <hr />
            <div>
                {ShowTotal ?
                <UserCardBlock
                    products={props.user.cartDetail}
                    removeItem={removeFromCart}
                /> 
                : <div> <Skeleton animation='wave' height = {50} /> <Skeleton animation='wave' height = {50} /> <Skeleton animation='wave' height = {50} /> </div> }

            </div>

        </div>
    )
}

export default CartPage