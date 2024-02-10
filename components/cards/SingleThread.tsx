import React from 'react'
import { singleThreadProps } from '@/types/types'
import Link from 'next/link';
import {ControlButtons, ProfileAvatar} from '../shared/SingleThreadAddOns';

const SingleThread = ({id, currentUser, parentId, thread, threadImage, author, comments, community, isComment, likes}:singleThreadProps) => {
  return (
    <article className={`w-full flex flex-col rounded-lg ${isComment ? 'px-0 xs:px-5' : 'bg-dark-2 lg:p-7 p-5'}`}>
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <ProfileAvatar 
              path={`/profile/${author.id}`}
              imageSrc={author.image}
              authorId={author.id}
              userId={currentUser}
              followers={author.followers}
            />
            <div className='thread-card_bar'/>
          </div>
          <div className='flex w-full flex-col gap-3'>
            <Link href={`/profile/${author.id}`} className='w-fit'>
              <h4 className='cursor-pointer text-base-semibold text-light-1 capitalize'>{author.name}</h4>
            </Link>
            {threadImage && 
              <div className='w-full my-3'>
                <img src={threadImage} alt='thread_image' className='rounded-lg'/>
              </div>
            }
            <p className='text-small-regular text-light-2'>{thread}</p>
            <div className={`${isComment && 'mb-10'} lg:mt-4 mt-3 flex flex-col gap-3`}>
              <ControlButtons 
                path={`/thread/${id}`} 
                likes={likes}
                threadId={id}
                userId={currentUser}
              />
              <div className="flex items-center gap-3">
                { comments && comments.length > 0 && 
                  (<Link href={`/thread/${id}`}>
                    <p className="mt-1 text-subtle-medium text-gray-1">
                      {comments.length} { comments.length === 1 ? 'reply' : 'replies' } 
                    </p>
                  </Link>)
                }
                { likes && likes.length > 0 && 
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {likes.length} { likes.length === 1 ? 'like' : 'likes' } 
                  </p>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default SingleThread;