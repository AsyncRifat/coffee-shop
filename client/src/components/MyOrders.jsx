import axios from 'axios';
import React, { Suspense, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthContext';
// import OrderCard from './OrderCard';
const OrderCard = React.lazy(() => import('./OrderCard'));
import Loading from './loader/Loading';

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios(`${import.meta.env.VITE_API_URL}/my-orders/${user?.email}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(data => {
        // console.log(data.data);
        setOrder(data?.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [user]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
      {order.length === 0 ? (
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
      ) : (
        <Suspense fallback={<Loading />}>
          {order.map(order => (
            <OrderCard key={order._id} order={order} />
          ))}
        </Suspense>
      )}
    </div>
  );
};

export default MyOrders;
