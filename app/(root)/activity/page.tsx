import React from 'react'
import { fetchActivity, fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const Page =  async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo:any = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding');

  const activity = await fetchActivity(userInfo._id);

  return (
    <section>
      <h2 className='head-text mb-10'>Activity</h2>
      <section className='mt-10 flex flex-col gap-5'>
        { activity.length > 0 ? 
          <React.Fragment>
            { activity.map((item:any) => (
              <Link href={`/thread/${item.parentId}`} key={item._id}>
                <article className='activity-card'>
                  <Image 
                    src={item.author.image} 
                    alt='author_image'
                    width={30}
                    height={30}
                    className='rounded-full object-cover'
                  />
                  <p className='!text-small-regular text-light-1'>
                    <span className='mr-1 text-primary-500'>{item.author.name}</span> replied to your thread
                  </p>
                </article>
              </Link>
              ))
            }
          </React.Fragment> : 
          <p className='!text-base-regular text-light-3'>No activity yet</p>
        }
      </section>
    </section>
  )
}

export default Page