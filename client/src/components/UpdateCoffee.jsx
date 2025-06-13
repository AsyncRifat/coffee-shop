import React from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const UpdateCoffee = () => {
  const coffeeData = useLoaderData();
  const { _id, photo, quantity, price, name, details, supplier, taste } =
    coffeeData;

  const handleUpdateCoffee = e => {
    e.preventDefault();

    const form = e.target;
    const fromData = new FormData(form);
    const updatedCoffee = Object.fromEntries(fromData.entries());
    // console.log(updatedCoffee);

    // send Updated Coffee data to the db
    fetch(`http://localhost:3000/coffees/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCoffee),
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your coffee updated successfully',
            showConfirmButton: false,
            timer: 1000,
          });

          // console.log('after update data', data);
        }
      });
  };

  return (
    <div className="px-24 py-7 bg-[#F4F3F0] mt-10 rounded-sm">
      <div className="p-12 text-center space-y-4">
        <h1 className="text-4xl rancho">Update Existing Coffee Details</h1>
        <form onSubmit={handleUpdateCoffee}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <fieldset className="fieldset rounded-box p-2">
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                defaultValue={name}
                className="input w-full"
                placeholder="Enter coffee name"
              />
            </fieldset>
            <fieldset className="fieldset rounded-box p-2">
              <label className="label">Quantity</label>
              <input
                type="number"
                name="quantity"
                defaultValue={quantity}
                className="input w-full"
                placeholder="Enter coffee Quantity"
              />
            </fieldset>
            <fieldset className="fieldset rounded-box p-2">
              <label className="label">Supplier</label>
              <input
                type="text"
                name="supplier"
                defaultValue={supplier}
                className="input w-full"
                placeholder="Enter coffee supplier"
              />
            </fieldset>
            <fieldset className="fieldset rounded-box p-2">
              <label className="label">Taste</label>
              <input
                type="text"
                name="taste"
                defaultValue={taste}
                className="input w-full"
                placeholder="Enter coffee taste"
              />
            </fieldset>
            <fieldset className="fieldset rounded-box p-2">
              <label className="label">Price</label>
              <input
                type="number"
                name="price"
                defaultValue={price}
                className="input w-full"
                placeholder="Price per cup"
              />
            </fieldset>
            <fieldset className="fieldset rounded-box p-2">
              <label className="label">Details</label>
              <input
                type="text"
                name="details"
                defaultValue={details}
                className="input w-full"
                placeholder="Enter coffee details"
              />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset rounded-box my-6 px-2">
              <label className="label">Photo</label>
              <input
                type="text"
                name="photo"
                defaultValue={photo}
                className="input w-full"
                placeholder="Enter photo URL"
              />
            </fieldset>
          </div>
          <div className="px-2">
            <input
              type="submit"
              className="btn w-full rancho text-[#331A15] bg-[#D2B48C] text-2xl"
              value=" Update Coffee Details"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCoffee;
