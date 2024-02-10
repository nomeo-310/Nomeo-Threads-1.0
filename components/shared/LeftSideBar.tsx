"use client"


import { sidebarLinks } from '@/constants'
import { itemProps } from '@/types/types'
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SignOutButton, SignedIn, useAuth } from '@clerk/nextjs';

const LeftSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();

  const LeftSideBarItem = ({route, label, imgURL, isActive}:itemProps) => {
    return (
      <Link href={route} className={`leftsidebar_link ${isActive && 'bg-primary-500'}`}>
        <Image src={imgURL} alt={label} width={24} height={24} />
        <p className='text-light-1 max-lg:hidden'>{label}</p>
      </Link>
    )
  }

  const SignOut = () => {
    return (
      <SignedIn>
        <SignOutButton signOutCallback={() => router.push('/sign-in')}>
          <div className="flex cursor-pointer gap-4 p-4">
            <Image src='/assets/logout.svg' alt='log_out' width={24} height={24}/>
            <p className='text-light-2 max-lg:hidden'>Logout</p>
          </div>
        </SignOutButton>
      </SignedIn>
    )
  }

  return (
    <section className='custom-scrollbar leftsidebar'>
      <div className="w-full flex flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link:any) => {
          if (link.route === '/profile') link.route = `${link.route}/${userId}`
          return (
            <LeftSideBarItem 
              key={link.label} {...link} 
              isActive={pathname.includes(link.route) && link.route.length > 1 || pathname === link.route}
            />
          )
        }
        )}
      </div>
      <div className="mt-10 px-6">
        <SignOut/>
      </div>
    </section>
  )
}

export default LeftSideBar