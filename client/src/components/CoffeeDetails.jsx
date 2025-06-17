import React, { useContext, useEffect, useState } from 'react';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { GiReturnArrow } from 'react-icons/gi';
import { useLoaderData, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthContext';
import axios from 'axios';

const CoffeeDetails = () => {
  const { data } = useLoaderData();

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [coffeeDetails, setCoffeeDetails] = useState(data);
  const {
    photo,
    quantity,
    price,
    name,
    details,
    taste,
    supplier,
    likedBy,
    email,
    _id,
  } = coffeeDetails || {};
  // console.log(_id);

  const [liked, setLiked] = useState(likedBy.includes(user?.email));
  const [likeCount, setLikeCount] = useState(likedBy.length);

  // jodi value aste time lage tai jonne ami eta korchi
  useEffect(() => {
    setLiked(likedBy.includes(user?.email));
  }, [likedBy, user]);

  // console.log('is Liked?:', liked);

  // handle like/dislike
  const handleLike = () => {
    if (user?.email === email) return alert('Lojja kore na vai');

    // handle like toggle api fetch call
    axios
      .patch(`${import.meta.env.VITE_API_URL}/like/${_id}`, {
        email: user?.email,
      })
      .then(data => {
        // console.log(data.data);

        const isLike = data?.data?.liked;

        // update like state
        setLiked(isLike);

        // update like count state
        setLikeCount(prev => (isLike ? prev + 1 : prev - 1));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleOrder = () => {
    if (user?.email === email) return alert('its yours . not working');

    const orderInfo = {
      coffeeId: _id,
      customerEmail: user?.email,
    };

    // save order info in db
    axios
      .post(`${import.meta.env.VITE_API_URL}/place-order/${_id}`, orderInfo)
      .then(data => {
        console.log(data);
        setCoffeeDetails(prev => {
          return { ...prev, quantity: prev.quantity - 1 };
        });
      });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-[#F4F3F0]">
      <div className="flex items-center justify-evenly pt-3">
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
          <p className="raleway mt-1">
            <span className="font-semibold">Likes:</span> {likeCount}
          </p>
          <div className="flex gap-3 mt-3">
            <button
              onClick={handleLike}
              className="px-3 py-0.5 bg-gray-200 cursor-pointer rounded-md active:text-blue-700"
            >
              {liked ? (
                <>
                  <div className="relative group ">
                    <AiFillLike size={22} className="text-blue-700" />

                    {/* Tooltip */}
                    <span className="absolute mb-1 w-32 -left-18 -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-black text-white text-xs px-1 py-1 rounded">
                      Already Liked.Do you want Dislike?
                    </span>
                  </div>
                </>
              ) : (
                <AiFillLike size={22} />
              )}
            </button>
            <button
              onClick={handleOrder}
              className="px-3 py-0.5 bg-green-600 cursor-pointer text-white rounded-md"
            >
              Order
            </button>
          </div>
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
