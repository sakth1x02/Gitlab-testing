"use client"

import Link from "next/link"
import Image from "next/image"

const NavLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="h-24 sm:h-26 md:h-28 w-auto">
        <Image
          src="/images/hads-logo.png"
          alt="HADS Logo"
          width={120}
          height={112}
          className="h-full w-auto object-contain"
          priority
        />
      </div>
    </Link>
  )
}

export default NavLogo
