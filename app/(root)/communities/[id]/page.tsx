import React from 'react'
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import ProfileHeader from '@/components/shared/ProfileHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { communityTabs } from '@/constants';
import Image from 'next/image';
import ThreadsTab from '@/components/shared/ThreadsTab';
import { fetchCommunityDetails } from '@/lib/actions/community.actions';
import SingleUser from '@/components/cards/SingleUser';

const Page =  async ({params}:{params: {id:string}}) => {
  if (!params.id) return null;
  const user = await currentUser();
  if (!user) return null;

  const communityDetails = await fetchCommunityDetails(params.id);
  if (!communityDetails) return null;
  
  const userInfo = await fetchUser(user.id);
  if (!userInfo) return null;

  return (
    <section className='relative'>
      <ProfileHeader
        accountId={communityDetails.id}
        loggedInUserId={user.id}
        bio={communityDetails.bio}
        name={communityDetails.name}
        username={communityDetails.username}
        image={communityDetails.image}
        followers={communityDetails.followers}
        type='Community'
        isAdmin={communityDetails.members[0].id === user.id}
      />
      <div className="mt-9">
        <Tabs defaultValue='threads' className='w-full'>
          <TabsList className='tab'>
            { communityTabs.map((tabItem) => (
              <TabsTrigger key={tabItem.label} value={tabItem.value} className='tab'>
                <Image src={tabItem.icon} alt={tabItem.label} width={24} height={24} className='object-contain'/>
                <p className='max-sm:hidden'>{tabItem.label}</p>
                { tabItem.label === 'Threads' && 
                  <p className='ml-1 rounded bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                    {communityDetails.threads.length}
                  </p>
                }
                { tabItem.label === 'Members' && 
                  <p className='ml-1 rounded bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                    {communityDetails.members.length}
                  </p>
                }
              </TabsTrigger>
              ))
            }
          </TabsList>
          { communityTabs.map((tabItem) => (
            <TabsContent key={`content-${tabItem.label}`} value={tabItem.value} className='w-full text-light-1'>
              { tabItem.value === 'threads' && 
                <ThreadsTab
                  currentUserId={user.id}
                  accountId={communityDetails._id}
                  accountType='Community'
                />
              }
              { tabItem.value === 'members' && 
                <section className='mt-9 flex flex-col gap-10'>
                  { communityDetails.members && communityDetails.members.map((member:any) => (
                    <SingleUser
                      key={member._id}
                      id={member.id}
                      name={member.name}
                      username={member.username}
                      image={member.image}
                      personType='User'
                    />
                  ))}
                </section>
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