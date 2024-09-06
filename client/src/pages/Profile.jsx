import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="max-w-full mx-auto ">
      <h1 className="text-4xl font-semibold  text-center my-14">Profile</h1>
      <form className="flex flex-col gap-4 sm:w-1/3 sm:mx-auto mr-4 ml-4">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="h-24 w-24 self-center rounded-full cursor-pointer object-cover"
        />
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg "
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
        />
        <button className="bg-slate-700 p-3 rounded-lg text-white hover:opacity-80 disabled:opacity-95">UPDATE</button>
        <button className="bg-green-700 p-3 rounded-lg text-white hover:opacity-80 disabled:opacity-95 uppercase">create listing</button>

      </form>
      <div className="flex  text-center justify-center gap-5 mt-4">
        <span className="text-red-700 cursor-pointer sm:mr-80 mr-40  ">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>

      </div>
    </div>
  );
}

export default Profile;
