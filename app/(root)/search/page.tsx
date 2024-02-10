import React from 'react'
import { fetchAllUsers, fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import SingleUser from '@/components/cards/SingleUser';

const Page =  async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding');

  const searchParams = {userId: user.id, searchString: '', pageNumber: 1, pageSize: 15, }
  const results = await fetchAllUsers(searchParams);
  return (
    <section>
      <h2 className='head-text mb-10'>Search</h2>
      <div className="mt-14 flex flex-col gap-9">
        { results.users.length === 0 ? 
          <p className='no-results'>No users</p> :
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