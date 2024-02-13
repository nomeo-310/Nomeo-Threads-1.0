import React from 'react'
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { fetchCommunities } from '@/lib/actions/community.actions';
import SingleCommunity from '@/components/cards/SingleCommunity';
import { SearchBar } from '@/components/shared/SingleThreadAddOns';

const Page =  async ({searchParams}: {searchParams: { [key: string]: string | undefined }}) => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding');

  const searchParameters = {userId: user.id, searchString: searchParams.q, pageNumber: searchParams?.page ? +searchParams.page : 1, pageSize: 15, }
  const results = await fetchCommunities(searchParameters);

  return (
    <section>
      <h2 className='head-text mb-10'>Search</h2>
      <SearchBar routeType='communities'/>
      <div className="mt-14 grid lg:grid-cols-2 gap-x-9 gap-y-4">
        { results.communities.length === 0 ? 
          <p className='no-results text-light-1'>No Communities</p> :
          <React.Fragment>
            { results.communities.map((community:any) => (
              <SingleCommunity 
                key={community.id}
                name={community.name}
                username={community?.username}
                id={community.id}
                image={community.image}
                bio={community.bio}
                members={community.members}
              />
              ))
            }
          </React.Fragment>
        }
      </div>
    </section>
  )
}

export default Page