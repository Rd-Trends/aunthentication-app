import Link from "next/link";
import React from "react";
import useUser from "../hooks/useUser";

const UserDetails = () => {
  const { user } = useUser();

  return (
    <div className="w-full py-0 max-w-2xl md:rounded-xl md:border md:border-[#E0E0E0] mt-4 md:mt-8">
      <div className=" flex items-end border-b justify-between border-[#E0E0E0] px-4 md:px-10 py-8">
        <div className="pr-4">
          <h2 className=" text-2xl mb-2">profile</h2>
          <p className="text-xs font-medium">
            Some info may be visible to other people
          </p>
        </div>
        <Link
          href="/edit-profile"
          className=" border border-[#828282] py-2 rounded-xl px-8"
        >
          Edit
        </Link>
      </div>
      <div className=" flex items-center border-b justify-between md:justify-start border-[#E0E0E0] px-4 md:px-10 py-8">
        <p className=" text-xs font-medium uppercase text-[#BDBDBD] md:w-3/12">
          photo
        </p>
        {user?.photo ? (
          <img
            src={user.photo}
            alt=""
            width={70}
            height={70}
            className="rounded-lg"
          />
        ) : null}
      </div>
      <div className=" flex items-center border-b justify-between md:justify-start border-[#E0E0E0] px-4 md:px-10 py-8">
        <p className=" text-xs font-medium uppercase text-[#BDBDBD] md:w-3/12">
          name
        </p>
        <p className="text-lg font-medium md:w-9/12">{user?.name}</p>
      </div>
      <div className=" flex items-center border-b justify-between md:justify-start border-[#E0E0E0] px-4 md:px-10 py-8">
        <p className=" text-xs font-medium uppercase text-[#BDBDBD] w-3/12">
          bio
        </p>
        <p className="text-lg text-right md:text-left font-medium w-9/12 ">
          {user?.bio}
        </p>
      </div>
      <div className=" flex items-center border-b justify-between md:justify-start border-[#E0E0E0] px-4 md:px-10 py-8">
        <p className=" text-xs font-medium uppercase text-[#BDBDBD] w-3/12">
          phone
        </p>
        <p className="text-lg font-medium ">{user?.phone}</p>
      </div>
      <div className=" flex items-center  justify-between md:justify-start border-b border-[#E0E0E0] px-4 md:px-10 py-8">
        <p className=" text-xs font-medium uppercase text-[#BDBDBD] w-3/12">
          email
        </p>
        <p className="text-lg font-medium ">{user?.email}</p>
      </div>
      <div className="border-b border-[#E0E0E0] md:border-none flex items-center justify-between md:justify-start px-4 md:px-10 py-8">
        <p className=" text-xs font-medium uppercase text-[#BDBDBD] w-3/12">
          password
        </p>
        <p className="text-lg font-medium ">*************</p>
      </div>
    </div>
  );
};

export default UserDetails;
