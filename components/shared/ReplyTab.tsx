import { fetchUserReplies } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import React from 'react'
import SingleThread from '../cards/SingleThread'

export interface threadsTabProps {
  currentUserId:string
  accountId:string
}

const ReplyTab = async ({currentUserId, accountId}:threadsTabProps) => {
  const response = await fetchUserReplies(accountId);
  if (!response) redirect('/');
  return (
    <section className='mt-9 flex flex-col gap-8'>
      {response.map((thread: any) => (
          <SingleThread
          key={thread._id} 
          id={thread._id}
          currentUser={currentUserId}
          parentId={thread.parentId}
          thread={thread.thread}
          author={thread.author}
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

export default ReplyTab;  