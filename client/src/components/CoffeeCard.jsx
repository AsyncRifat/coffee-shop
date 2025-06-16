import React from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { LiaMehRollingEyesSolid } from 'react-icons/lia';
import { MdDeleteSweep } from 'react-icons/md';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const CoffeeCard = ({ coffee, coffees, setCoffees }) => {
  const navigate = useNavigate();
  // console.log(coffee._id);
  const { photo, quantity, price, name, _id } = coffee;

  const handleDelete = id => {
    console.log(id);
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: "You won't be able to revert this!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, delete it!',
    // }).then(result => {
    //   // console.log(result.isConfirmed);
    //   if (result.isConfirmed) {
    //     // start deleting coffee
    //     fetch(`http://localhost:3000/coffees/${_id}`, {
    //       method: 'DELETE',
    //     })
    //       .then(res => res.json())
    //       .then(data => {
    //         if (data.deletedCount) {
    //           Swal.fire({
    //             title: 'Deleted!',
    //             text: 'Your Coffee has been deleted.',
    //             icon: 'success',
    //           });
    //           // console.log('after delete', data);

    //           //  remove the coffee from the state
    //           const remainingCoffees = coffees.filter(cof => cof._id !== id);
    //           setCoffees(remainingCoffees);
    //         }
    //       });
    //   }
    // });
  };

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
        </div>
        <div className="col-span-4 flex flex-col mx-auto justify-center gap-3 ml-20">
          <div className="relative group inline-block">
            <Link to={`coffee/${_id}`}>
              <LiaMehRollingEyesSolid
                size={30}
                className="bg-[#D2B48C] p-0.5 rounded-sm text-white cursor-pointer"
              />
            </Link>

            {/* Tooltip */}
            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-black text-white text-xs px-2 py-1 rounded">
              Details
            </span>
          </div>

          <div className="relative group inline-block">
            <AiOutlineEdit
              onClick={() => navigate(`/updateCoffee/${_id}`)}
              size={30}
              className="bg-[#3C393B] p-0.5 rounded-sm text-white cursor-pointer"
            />

            {/* Tooltip */}
            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-black text-white text-xs px-2 py-1 rounded">
              Update
            </span>
          </div>

          <div className="relative group inline-block">
            <MdDeleteSweep
              onClick={() => handleDelete(_id)}
              size={30}
              className="bg-[#EA4744] p-0.5 rounded-sm text-white cursor-pointer"
            />

            {/* Tooltip */}
            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-black text-white text-xs px-2 py-1 rounded">
              Delete
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
