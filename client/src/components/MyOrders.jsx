import React, { Suspense, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthContext';
// import OrderCard from './OrderCard';
const OrderCard = React.lazy(() => import('./OrderCard'));
import Loading from './loader/Loading';
import useAxiosSecure from './hooks/useAxiosSecure';

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // const token = localStorage.getItem('token');

    axiosSecure(
      `/my-orders/${user?.email}`

      // I did these tasks in custom hooks useAxiosSecure

      //follow: //'/my-orders/:email', headers+ --> localStorageVerifyToken
      // {
      // headers: {
      //   authorization: `Bearer ${token}`,
      // },
      // }
    )
      .then(data => {
        // console.log(data.data);
        setOrder(data?.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [user, axiosSecure]);

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
