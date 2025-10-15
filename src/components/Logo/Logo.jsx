import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <>
   <Link href={"/"}>
        <div className="flex items-center gap-1 text-xl font-semibold tracking-tighter text-primary ">
          {/* <Image src="/" alt="logo" width={40} height={40}></Image> */}
          ShopFlow
        </div>
   </Link>
    
    </>
  );
}
