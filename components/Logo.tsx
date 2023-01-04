import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/devchallenges.svg"
        alt=""
        width={200}
        height={200}
        priority={true}
        quality={100}
      />
    </Link>
  );
};

export default Logo;
