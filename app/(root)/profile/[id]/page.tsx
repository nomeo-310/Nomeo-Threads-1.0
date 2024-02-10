import React from 'react'
import { fetchUser, fetchUserReplies, fetchUserThreads } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import ProfileHeader from '@/components/shared/ProfileHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { profileTabs } from '@/constants';
import Image from 'next/image';
import ThreadsTab from '@/components/shared/ThreadsTab';
import ReplyTab from '@/components/shared/ReplyTab';

const Page =  async ({params}:{params: {id:string}}) => {
  if (!params.id) return null;
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);
  const userThread = await fetchUserThreads(params.id);
  const userReplies = await fetchUserReplies(userInfo._id);
  const currentLoggedInUserInfo = await fetchUser(user.id);
  if (!currentLoggedInUserInfo?.onboarded) redirect('/onboarding');

  return (
    <section className='relative'>
      <ProfileHeader
        accountId={userInfo.id}
        loggedInUserId={user.id}
        bio={userInfo.bio}
        name={userInfo.name}
        username={userInfo.username}
        image={userInfo.image}
        followers={userInfo.followers}
      />
      <div className="mt-9">
        <Tabs defaultValue='threads' className='w-full'>
          <TabsList className='tab'>
            { profileTabs.map((tabItem) => (
              <TabsTrigger key={tabItem.label} value={tabItem.value} className='tab'>
                <Image src={tabItem.icon} alt={tabItem.label} width={24} height={24} className='object-contain'/>
                <p className='max-sm:hidden'>{tabItem.label}</p>
                { tabItem.label === 'Threads' && 
                  <p className='ml-1 rounded bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                    {userThread.threads.length}
                  </p>
                }
                { tabItem.label === 'Replies' && 
                  <p className='ml-1 rounded bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                    {userReplies.length}
                  </p>
                }
              </TabsTrigger>
              ))
            }
          </TabsList>
          { profileTabs.map((tabItem) => (
            <TabsContent key={`content-${tabItem.label}`} value={tabItem.value} className='w-full text-light-1'>
              { tabItem.value === 'threads' && 
                <ThreadsTab
                  currentUserId={user.id}
                  accountId={userInfo.id}
                  accountType='User'
                />
              }
              { tabItem.value === 'replies' && 
                <ReplyTab
                  currentUserId={user.id}
                  accountId={userInfo._id} 
                />
              }
            </TabsContent>
            ))
          }
        </Tabs>
      </div>
    </section>
  )
}

export default Page;