"use client"

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import React from 'react'
import { itemProps } from '@/types/types';
import Image from 'next/image';
import { sidebarLinks } from '@/constants'

const BottomBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const BottomBarItem = ({route, label, imgURL, isActive}:itemProps) => {
    return (
      <Link href={route} className={`bottombar_link ${isActive && 'bg-[#877EFF]'}`}>
        <Image src={imgURL} alt={label} width={24} height={24} />
        <p className='text-subtle-medium text-light-1 max-sm:hidden'>{label.split(/\s+/)[0]}</p>
      </Link>
    )
  }
  return (
    <section className='bottombar'>
      <div className="bottombar_container">
        {sidebarLinks.map((link:any) => (
            < BottomBarItem 
              key={link.label} {...link} 
              isActive={pathname.includes(link.route) && link.route.length > 1 || pathname === link.route}
            />)
          )}
      </div>
    </section>
  )
}

export default BottomBar