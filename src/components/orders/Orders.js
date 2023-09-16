import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../../context/userOrderContext';
import { addToOrders, addTocancelOrders, addToreturnOrders } from '../../redux/amazonSlice';
import { collection, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import OrderDetails from './orderDetails';

const Orders = () => {
  const dispatch = useDispatch();
  const { userOrders, updateUserOrders } = useOrders();
  const orders = useSelector((state) => state.amazon.orders);
  const cancelOrders = useSelector((state) => state.amazon.cancelOrders);
  const returnOrders = useSelector((state) => state.amazon.returnOrders);
  const authenticated = useSelector((state) => state.amazon.isAuthenticated);
  const userInfo = useSelector((state) => state.amazon.userInfo);

  // Reverse the orders array
  const reversedOrders = [...orders].reverse();
  const reversedCancelOrders = [...cancelOrders].reverse();
  const reversedReturnOrders = [...returnOrders].reverse();

  const [showOrders, setShowOrders] = useState(true);
  const [showCancelOrders, setShowCancelOrders] = useState(false);
  const [showReturnOrders, setShowReturnOrders] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  // Use useEffect to navigate when isAuthenticated is false
  useEffect(() => {
    if (!authenticated) {
      navigate('/signIn');
    }
  }, [authenticated, navigate]);

  const handleCancelOrder = async (item) => {
    const userCancelOrdersRef = doc(collection(db, 'users', userInfo.email, 'cancelOrders'), userInfo.id);
    try {
      const userCancelOrdersSnapshot = await getDoc(userCancelOrdersRef);
      if (userCancelOrdersSnapshot.exists()) {
        const cancelOrdersData = userCancelOrdersSnapshot.data().cancelOrders;
        cancelOrdersData.push(item);
        await updateDoc(userCancelOrdersRef, { cancelOrders: cancelOrdersData });
        dispatch(addTocancelOrders(cancelOrdersData));
      } else {
        await setDoc(userCancelOrdersRef, { cancelOrders: [item] });
        dispatch(addTocancelOrders([item]));
      }
    } catch (error) {
      console.error('Error saving orders to Firebase:', error);
    }
    handleUpdateOrder(item);
  };

  const handleReturnOrder = async (item) => {
    const userReturnOrdersRef = doc(collection(db, 'users', userInfo.email, 'returnOrders'), userInfo.id);
    try {
      const userReturnOrdersSnapshot = await getDoc(userReturnOrdersRef);
      if (userReturnOrdersSnapshot.exists()) {
        const returnOrdersData = userReturnOrdersSnapshot.data().returnOrders;
        returnOrdersData.push(item);
        await updateDoc(userReturnOrdersRef, { returnOrders: returnOrdersData });
        dispatch(addToreturnOrders(returnOrdersData));
      } else {
        await setDoc(userReturnOrdersRef, { returnOrders: [item] });
        dispatch(addToreturnOrders([item]));
      }
    } catch (error) {
      console.error('Error saving orders to Firebase:', error);
    }
    handleUpdateOrder(item);
  };

  const handleUpdateOrder = async (item) => {
    const userOrdersRef = doc(collection(db, 'users', userInfo.email, 'orders'), userInfo.id);
    const userOrdersSnapshot = await getDoc(userOrdersRef);
    if (userOrdersSnapshot.exists()) {
      const userOrdersData = userOrdersSnapshot.data().orders;
      const updatedOrders = userOrdersData.filter(order => order.uniqueNumber !== item.uniqueNumber);
      await updateDoc(userOrdersRef, { orders: updatedOrders });
      const updatedUserOrders = userOrders.filter(order => order.uniqueNumber !== item.uniqueNumber);
      updateUserOrders(updatedUserOrders);
      dispatch(addToOrders(updatedUserOrders));
    }
  }

  return (
    <div className='w-full relative py-6 flex flex-col gap-5 bg-white pl-[15%]'>
      <div className='w-full h-10 flex gap-7'>
        <p className={`font-semibold text-2xl cursor-pointer ${showOrders ? "text-blue-500" : ""}`} onClick={() => {
          setShowOrders(true);
          setShowCancelOrders(false);
          setShowReturnOrders(false);
        }}>Your Orders</p>
        <p className={`font-semibold text-2xl cursor-pointer ${showCancelOrders ? "text-blue-500" : ""}`} onClick={() => {
          setShowOrders(false);
          setShowCancelOrders(true);
          setShowReturnOrders(false);
        }}>Cancelled Orders</p>
        <p className={`font-semibold text-2xl cursor-pointer ${showReturnOrders ? "text-blue-500" : ""}`} onClick={() => {
          setShowOrders(false);
          setShowCancelOrders(false);
          setShowReturnOrders(true);
        }}>Returned Orders</p>
      </div>

      {showOrders && <OrderDetails ordersData={reversedOrders} reversedOrders={reversedOrders} handleCancelOrder={handleCancelOrder} handleReturnOrder={handleReturnOrder} />}
      {showCancelOrders && <OrderDetails ordersData={reversedCancelOrders}/>}
      {showReturnOrders && <OrderDetails ordersData={reversedReturnOrders}/>}

    </div >
  )
};
export default Orders;


