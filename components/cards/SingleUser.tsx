'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export interface singleUserProps {
  id: string
  name: string
  username: string
  image: string
  personType: string
}

const SingleUser = ({id, name, username, image, personType}:singleUserProps) => {
  const router = useRouter();
  return (
    <article className='user-card'>
      <div className="user-card_avatar">
        <Image src={image} width={48} height={48} className='rounded-full' alt='profile_image'/>
        <div className="flex-1 text-ellipsis">
          <h4 className='text-base-semibold text-light-1 capitalize'>{name}</h4>
          <p className='text-small-medium text-gray-1'>@{username}</p>
        </div>
      </div>
      <button className='bg-primary-500 py-1 lg:py-[6px] px-4 lg:px-6 rounded-full text-light-1' onClick={() => router.push(`/profile/${id}`)}>
        View
      </button>
    </article>
  )
}

export default SingleUser;