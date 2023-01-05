import classNames from "classnames";
import Link from "next/link";
import React from "react";

const Footer = ({ className = "" }: { className: string }) => {
  return (
    <div className={`flex items-center justify-between  ${className}`}>
      <p className=" text-sm ">
        created by{" "}
        <Link
          href="https://github.com/rd-trends"
          target="_blank"
          rel="noreffer"
          className="font-semibold"
        >
          Daniel ikoyo
        </Link>
      </p>
      <Link
        href="https://devchallenges.io"
        target="_blank"
        rel="noreffer"
        className="block font-semibold text-sm"
      >
        devchallenges.io
      </Link>
    </div>
  );
};

export default Footer;
