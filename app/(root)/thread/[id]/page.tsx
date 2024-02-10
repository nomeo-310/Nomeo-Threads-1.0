import SingleThread from '@/components/cards/SingleThread';
import Comment from '@/components/forms/Comment';
import { fetchThreadById } from '@/lib/actions/thread.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

const Page =  async ({params}:{params: {id:string}}) => {
  if (!params.id) return null;
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const thread = await fetchThreadById(params.id);

  return (
    <section className='relative'>
      <div>
        <SingleThread 
          id={thread._id}
          currentUser={user.id ? user.id : ''}
          parentId={thread.parentId}
          thread={thread.thread}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
          threadImage={thread.threadImage}
          likes={thread.likes}
        />
      </div>
      <div className='mt-7'>
        <Comment 
          threadId={thread.id}
          currentUserId={userInfo._id}
          currentUserImage={userInfo.image}
        />
      </div>
      <div className="mt-10 flex flex-col">
        {thread.children.map((threadItem:any) => (
          <SingleThread 
            id={threadItem._id}
            currentUser={user.id ? user.id : ''}
            parentId={threadItem.parentId}
            thread={threadItem.thread}
            author={threadItem.author}
            community={threadItem.community}
            createdAt={threadItem.createdAt}
            comments={threadItem.children}
            threadImage={threadItem.threadImage}
            isComment
            likes={threadItem.likes}
          />
        ))}
      </div>
    </section>
  )
}

export default Page;