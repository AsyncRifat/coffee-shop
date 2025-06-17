import React from 'react';

const OrderCard = ({ order }) => {
  const { photo, quantity, price, name, _id } = order;
  return (
    <div className="card card-side bg-[#F4F3F0] shadow-sm px-3">
      <div className="grid grid-cols-12 mx-auto space-x-5">
        <figure className="col-span-4">
          <img
            src={photo}
            className="w-auto h-auto object-cover"
            alt="Coffee"
          />
        </figure>
        <div className="flex flex-col justify-center space-y-3 col-span-4">
          <h2 className="raleway">
            <span className="font-semibold">Name:</span> {name}
          </h2>
          <p className="raleway">
            <span className="font-semibold">Quantity:</span> {quantity}
          </p>
          <p className="raleway">
            <span className="font-semibold">Price:</span> ${price}
          </p>
          <button className='btn btn-warning'>Cancel Order</button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
