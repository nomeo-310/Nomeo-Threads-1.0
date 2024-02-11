"use client"


import { OrganizationSwitcher, SignOutButton, SignedIn } from '@clerk/nextjs';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { dark } from '@clerk/themes';
import { useRouter } from 'next/navigation';

const TopBar = () => {
  const router = useRouter();
  
  const SignOut = () => {
    return (
      <SignedIn>
        <SignOutButton signOutCallback={() => router.push('/sign-in')}>
          <div className="flex cursor-pointer">
            <Image src='/assets/logout.svg' alt='log_out' width={24} height={24}/>
          </div>
        </SignOutButton>
      </SignedIn>
    )
  }
  return (
    <div className='topbar'>
      <Link href="/" className='flex items-center gap-4'>
        <Image src="/assets/logo.svg" width={28} height={28} alt='app_logo'/>
        <p className='text-heading3-bold text-light-1 max-xs:hidden'>Nomeo Threads</p>
      </Link>
      <div className='flex items-center gap-1'>
        <div className="block md:hidden">
          <SignOut/>
        </div>
      </div>
      <OrganizationSwitcher
        appearance={{
          baseTheme: dark,
          elements: {organizationSwitcherTrigger: 'py-2 px-4'}
        }}
      />
    </div>
  )
}

export default TopBar