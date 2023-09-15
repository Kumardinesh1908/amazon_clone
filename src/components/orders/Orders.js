import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useOrders } from '../../context/userOrderContext';
import ProductsSlider from '../home/ProductsSlider';

const Orders = () => {

  // const { userOrders, updateUserOrders } = useOrders();
  const orders = useSelector((state) => state.amazon.orders);
  const authenticated = useSelector((state) => state.amazon.isAuthenticated);
  console.log(authenticated)

  console.log(orders);

  // Reverse the orders array
  const reversedOrders = [...orders].reverse();

  const navigate = useNavigate(); // Initialize useNavigate

  // Use useEffect to navigate when isAuthenticated is false
  useEffect(() => {
    if (!authenticated) {
      navigate('/signIn');
    }
  }, [authenticated, navigate]);

  

  return (

    <div className='w-full relative py-6 flex flex-col gap-5 bg-white pl-[10%]'>
      <div className='w-full h-10'>
        <p className='font-semibold text-2xl'>Your Orders</p>
      </div>
      {
        reversedOrders.length > 0 ?
          <div>
            {
              reversedOrders.map((order, index) => (
                <div key={index} className='w-[80%] border h-[50%] rounded-md mb-5 flex flex-col'>
                  <div className='w-full flex flex-row flex-wrap gap-5 justify-between py-3 bg-gray-100 border-b-[1px]'>
                    <div className='flex flex-wrap h-9 gap-5 px-5'>
                      <div className='w-auto text-xs'>
                        <p>ORDER PLACED</p>
                        <p className='font-semibold'>
                          {new Date(order.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            weekday: 'long',
                          })}
                        </p>
                      </div>
                      <div className='w-auto text-xs h-auto'>
                        <p>TOTAL</p>
                        <p className='font-semibold'>
                          ₹{order.price}
                        </p>

                      </div>
                      <div className='w-auto text-xs h-auto'>
                        <p>SHIP TO</p>
                        <p className='font-semibold text-blue-400'>
                          {order.address.name}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className='font-semibold text-base'>Arriving in 2 days</p>
                    </div>
                    <div className='px-5'>
                      <div className='w-full text-xs'>
                        <p>ORDER ID : <span className='font-semibold text-blue-600'>{order.orderNumber}</span></p>
                      </div>
                    </div>
                  </div>
                  <div className='w-full h-auto my-4 '>
                    <div className='w-auto h-auto flex justify-between items-center flex-row gap-5 flex-wrap'>
                      <div className='px-4 flex flex-col gap-3'>
                        {/* <p className='font-semibold text-lg'>Arriving in 2 days</p> */}
                        <div className='w-auto h-auto flex gap-5'>
                          <div>
                            <img className='w-52 h-52' src={order.thumbnail} alt='order' />
                          </div>

                          <div className='w-[70%] flex flex-col gap-4 justify-between'>
                            <div className='flex flex-col gap-4'>
                              <div>
                                <Link to={`/${order.category}/${order.title}`}>
                                  <p className='text-lg font-semibold'>{order.title}</p>
                                </Link>
                              </div>
                              <div className=" capitalize -mt-1 text-sm mdl:text-base">
                                <span className='font-semibold'>{order.address.name}</span>
                                <span> {order.address.address}</span>
                                <span>, {order.address.area}</span>
                                <span>, {order.address.landmark}</span>
                                <span>, {order.address.city} </span>
                                <span>, {order.address.pincode}</span>
                                <span>, State : {order.address.state}</span>
                                <span>, Country : {order.address.country}</span>
                                <span className='font-semibold'>, Mobile Number : {order.address.mobile} &nbsp;</span>
                              </div>
                                <div className='flex items-center font-semibold '>
                                  Qty : {order.quantity}
                                </div>
                            </div>
                            <div className='flex'>
                              <button className='w-20 border-r-[1px] text-blue-600 '>Cancel</button>
                              <button className='w-20 text-blue-600'>Return</button>
                            </div>
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
          </div>

          : <div>
            <div className='flex items-center mx-[10%] mdl:mx-[30%]'>
              Looks like you haven't placed an order yet.
            </div>
            <div className='w-[80%]'>
              <ProductsSlider />
            </div>
          </div>

      }

    </div >
  )
};
export default Orders;
