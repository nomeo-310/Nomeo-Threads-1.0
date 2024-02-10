import { profileHeaderProps } from '@/types/types';
import React from 'react'
import { ProfileHeaderAvatar } from './SingleThreadAddOns';

const ProfileHeader = ({accountId, loggedInUserId, bio, name, username, image, followers}:profileHeaderProps) => {
  const alreadyAFollower = followers.includes(loggedInUserId)
  const currentUserLoggedIn = accountId === loggedInUserId;

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
          />
          <div className="flex-1">
            <h2 className='text-left text-heading3-bold text-light-1'>{name}</h2>
            <p className='text-base-medium text-gray-1'>@{username}</p>
          </div>
        </div>
        {/* add communities */}
      </div>
      <p className='mt-6 max-w-2xl text-base-regular text-light-2'>{bio}</p>
      <div className="mt-12 h-0.5 w-full bg-dark-3"/>
    </div>
  )
}

export default ProfileHeader;