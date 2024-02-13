'use client'

import { profileHeaderProps } from '@/types/types';
import React from 'react'
import { ProfileHeaderAvatar } from './SingleThreadAddOns';
import { useRouter, usePathname } from 'next/navigation';
import { updateCommunityBio } from '@/lib/actions/community.actions';

const ProfileHeader = ({accountId, loggedInUserId, bio, name, username, image, followers, type, isAdmin}:profileHeaderProps) => {
  const alreadyAFollower = followers?.includes(loggedInUserId)
  const currentUserLoggedIn = accountId === loggedInUserId;
  const route = useRouter();
  const pathname = usePathname();

  const [newBio, setNewBio] = React.useState(bio);
  const [editBio, setEditBio] = React.useState(false);
  const [isLoading, setIsloading] = React.useState(false);

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true)
    await updateCommunityBio(accountId, newBio, pathname);
    setIsloading(false)
    window.location.reload();
  }

  return (
    <div className='flex w-full flex-col justify-start'>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ProfileHeaderAvatar
            alreadyAFollower={alreadyAFollower}
            currentUserLoggedIn={currentUserLoggedIn}
            image={image}
            accountId={accountId}
            loggedInUserId={loggedInUserId}
            type={type}
          />
          <div className="flex-1">
            <h2 className='text-left text-heading3-bold text-light-1 capitalize'>{name}</h2>
            <p className='text-base-medium text-gray-1'>@{username}</p>
          </div>
        </div>
      </div>
      {editBio ?
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 mt-6'>
          <textarea rows={6} className='account-form_input focus:outline-none text-light-1 rounded p-4' value={newBio} onChange={(e) => setNewBio(e.target.value)}/>
          <div className='flex justify-end'>
            <button type='submit' className='text-light-2 bg-primary-500 py-2 px-5 lg:px-6 rounded-full' disabled={isLoading}>
              { isLoading ? '...Updating Bio' : 'Update Bio' }
            </button>
          </div>
        </form> : 
        <p className='mt-6 max-w-2xl text-base-regular text-light-2'>{bio}</p>
      }
      { currentUserLoggedIn &&
        <button className='mt-8' onClick={() => route.push('/profile/edit')}>
          <h2 className='text-base-regular text-light-2 bg-primary-500 rounded py-2 px-4'>Edit Profile</h2>
        </button>
      }
      { isAdmin && !editBio &&
        <button className='mt-8' onClick={() => setEditBio(true)}>
          <h2 className='text-base-regular text-light-2 bg-primary-500 rounded py-2 px-4'>Edit Community Bio</h2>
        </button>
      }
      <div className="mt-8 h-0.5 w-full bg-dark-3"/>
    </div>
  )
}

export default ProfileHeader;