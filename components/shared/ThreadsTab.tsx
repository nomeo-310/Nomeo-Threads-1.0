import { fetchUserThreads } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import React from 'react'
import SingleThread from '../cards/SingleThread'
import { fetchCommunityThreads } from '@/lib/actions/community.actions'

export interface threadsTabProps {
  currentUserId:string
  accountId:string
  accountType:string
}

const ThreadsTab = async ({currentUserId, accountId, accountType}:threadsTabProps) => {
  let response: any;

  if (accountType === 'Community') {
    response = await fetchCommunityThreads(accountId)
  } else {
    response = await fetchUserThreads(accountId);
  }
  
  if (!response) redirect('/');
  return (
    <section className='mt-9 flex flex-col gap-8'>
      {response.threads.map((thread: any) => (
          <SingleThread
          key={thread._id} 
          id={thread._id}
          currentUser={currentUserId}
          parentId={thread.parentId}
          thread={thread.thread}
          author={accountType === 'User' ? 
          {_id: response._id,name: response.name, image: response.image, id: response.id, followings: response.followings, followers: response.followers, username: response.username } : 
          {_id: thread.author._id, name: thread.author.name, image: thread.author.image, id: thread.author.id, followings: thread.author.followings, followers: thread.author.followers, username: thread.author.username}
          }
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
          threadImage={thread.threadImage}
          likes={thread.likes}
        />
      ))}
    </section>
  )
}

export default ThreadsTab;  