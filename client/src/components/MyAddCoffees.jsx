import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import MyAddedCoffee from './myAddedCoffee/MyAddedCoffee';

const MyAddCoffees = () => {
  const { data: initialCoffees } = useLoaderData();


  const [coffees, setCoffees] = useState(
    Array.isArray(initialCoffees) ? initialCoffees : []
  );
  // console.log(coffees);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        {coffees.map(coffee => (
          <MyAddedCoffee
            key={coffee._id}
            coffees={coffees}
            setCoffees={setCoffees}
            coffee={coffee}
          ></MyAddedCoffee>
        ))}
      </div>
    </>
  );
};

export default MyAddCoffees;