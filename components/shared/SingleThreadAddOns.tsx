'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { likeThread } from '@/lib/actions/thread.actions'
import { usePathname } from 'next/navigation'
import { controlButtonProps, profileAvatarProps, profileHeaderAvatarProps } from '@/types/types'
import { MinusCircle, PlusCircle } from '../reuseables/IconPack'
import { followUser } from '@/lib/actions/user.actions'

const ControlButtons = ({path, likes, threadId, userId}:controlButtonProps) => {
  const pathname = usePathname();
  const alreadyLiked = likes.includes(userId);

  const handleLikeThread = async() => {
    await likeThread(threadId, userId, pathname);
  }
  return (
    <div className="flex gap-3.5">
      <button onClick={handleLikeThread} className='flex items-center gap-1 text-light-3'>
        { alreadyLiked ? 
          <Image src='/assets/heart-filled.svg' alt='heart_filled_icon' width={24} height={24} className='cursor-pointer object-contain'/> : 
          <Image src='/assets/heart-gray.svg' alt='heart_icon' width={24} height={24} className='cursor-pointer object-contain'/>
        }
      </button>
      <Link href={path}>
        <Image src='/assets/reply.svg' alt='reply_icon' width={24} height={24} className='cursor-pointer object-contain'/>
      </Link>
      <Image src='/assets/repost.svg' alt='repost_icon' width={24} height={24} className='cursor-pointer object-contain'/>
      <Image src='/assets/share.svg' alt='share_icon' width={24} height={24} className='cursor-pointer object-contain'/>
    </div>
  )
}

const ProfileAvatar = ({path, imageSrc, authorId, userId, followers}:profileAvatarProps) => {
  const pathname = usePathname();
  const currentUserLoggedIn = authorId === userId;

  const alreadyAFollower = followers?.includes(userId)
  const addFollowers = async () => {
    await followUser(authorId, userId, pathname)
  }

  return (
    <div className='relative w-16 h-16'>
      <Link href={path}>
        <Image src={imageSrc} alt='profile_image' fill className='cursor-pointer rounded-full'/>
      </Link>
      { !currentUserLoggedIn && pathname === '/' &&
        <button className='absolute -right-1 -bottom-1 p-[2px] rounded-full bg-white' onClick={addFollowers}>
          { alreadyAFollower ? <MinusCircle className='w-5 h-5'/> :<PlusCircle className='w-4 h-4'/> }
        </button>
      }
    </div>
  )
}

const ProfileHeaderAvatar =({alreadyAFollower, currentUserLoggedIn, image, accountId, loggedInUserId}:profileHeaderAvatarProps) => {
  const pathname = usePathname();

  const addFollowers = async() => {
    await followUser(accountId, loggedInUserId, pathname)
  }
  return (
    <div className="relative h-28 w-28 object-cover">
      <Image src={image} alt='profile_image' fill className='rounded-full object-cover shadow-2xl'/>
      { !currentUserLoggedIn && 
        <button className='absolute -right-1 -bottom-1 p-[2px] rounded-full bg-white' onClick={addFollowers}>
          { alreadyAFollower ? <MinusCircle className='w-7 h-7'/> :<PlusCircle className='w-6 h-6'/> }
        </button>
      }
    </div>
  )
}

export { ControlButtons, ProfileAvatar, ProfileHeaderAvatar }