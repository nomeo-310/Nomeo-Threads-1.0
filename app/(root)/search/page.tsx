import React from 'react'
import { fetchAllUsers, fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import SingleUser from '@/components/cards/SingleUser';
import { SearchBar } from '@/components/shared/SingleThreadAddOns';

const Page =  async ({searchParams}: {searchParams: { [key: string]: string | undefined }}) => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding');

  const searchParameters = {userId: user.id, searchString: searchParams.q, pageNumber: searchParams?.page ? +searchParams.page : 1, pageSize: 15, }
  const results = await fetchAllUsers(searchParameters);
  return (
    <section>
      <h2 className='head-text mb-10'>Search</h2>
      <SearchBar routeType={'search'}/>
      <div className="mt-14 flex flex-col gap-9">
        { results.users.length === 0 ? 
          <p className='no-results text-light-1'>No users</p> :
          <React.Fragment>
            { results.users.map((user:any) => (
              <SingleUser 
                key={user.id}
                name={user.name}
                username={user.username}
                id={user.id}
                personType='User'
                image={user.image}
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