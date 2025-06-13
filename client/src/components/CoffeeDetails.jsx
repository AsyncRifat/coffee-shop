import React from 'react';
import { GiReturnArrow } from 'react-icons/gi';
import { useLoaderData, useNavigate } from 'react-router';

const CoffeeDetails = () => {
  const coffeeDetails = useLoaderData();
  const navigate = useNavigate();
  const { photo, quantity, price, name, details, taste, supplier } =
    coffeeDetails;
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-[#F4F3F0]">
      <div className="flex items-center justify-evenly ">
        <figure>
          <img src={photo} alt="Coffee Cup" />
        </figure>
        <div className="">
          <h1 className="rancho text-3xl">Niceties</h1>
          <h2 className="raleway">
            <span className="font-semibold">Name:</span> {name}
          </h2>
          <p className="raleway">
            <span className="font-semibold">Quantity:</span> {quantity}
          </p>
          <p className="raleway">
            <span className="font-semibold">Price:</span> {price}
          </p>
          <p className="raleway">
            <span className="font-semibold">Taste:</span> {taste}
          </p>
          <p className="raleway">
            <span className="font-semibold">Supplier:</span> {supplier}
          </p>
          <p className="raleway">
            <span className="font-semibold">Details:</span> {details}
          </p>
        </div>
      </div>
      <div
        onClick={() => navigate('/')}
        className="card-actions justify-end m-1"
      >
        <button className="btn bg-[#F4F3F0] rancho text-xl text-amber-900">
          Home <GiReturnArrow />
        </button>
      </div>
    </div>
  );
};

export default CoffeeDetails;
