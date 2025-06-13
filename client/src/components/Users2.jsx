import { useQuery } from '@tanstack/react-query';
// import React, { useEffect, useState } from 'react';
import { MdDeleteSweep } from 'react-icons/md';
import Swal from 'sweetalert2';

const Users2 = () => {
  // using tanStack
  const {
    isError,
    error,
    isPending,
    data: users,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/users');
      return res.json();
    },
  });

  if (isPending) {
    return <span className="loading loading-spinner loading-md"></span>;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }

  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   fetch('http://localhost:3000/users')
  //     .then(res => res.json())
  //     .then(data => {
  //       setUsers(data);
  //     });
  // }, []);

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/users/${id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount) {
              // const remainingUsers = users.filter(user => user._id !== id);
              // setUsers(remainingUsers);

              Swal.fire({
                title: 'Deleted!',
                text: 'Your user has been deleted.',
                icon: 'success',
              });
              // console.log('After deleted', data);
            }
          });
      }
    });
  };
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>No</label>
            </th>
            <th>Name</th>
            <th>Phone No.</th>
            <th>Favorite Color</th>
            <th>Control panel</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={user._id}>
              <th>
                <label>{index + 1}</label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={user.photo}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user.name}</div>
                    <div className="text-sm opacity-50">{user.address}</div>
                  </div>
                </div>
              </td>
              <td>
                <p className="text-lg text-gray-500">+7 {user.phone}</p>
              </td>
              <td>{user.email}</td>
              <th>
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => handleDelete(user._id)}
                >
                  <MdDeleteSweep size={24} />
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users2;
