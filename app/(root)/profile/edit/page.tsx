import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { userDataProps } from "@/types/types";
import { currentUser } from "@clerk/nextjs";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null 
  const userInfo  = await fetchUser(user.id);

  const userData:userDataProps = {
    id: user?.id,
    _id: userInfo?._id,
    username: userInfo ? userInfo?.username : user?.username,
    name: userInfo ? userInfo?.name : user?.firstName || "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user?.imageUrl
  }

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-10">
      <h1 className="head-text">Update Profile Details</h1>
      <p className="mt-3 text-base-regular text-light-2">Update some of the information in your profile.</p>
      <section className="mt-9 bg-dark-2 p-10 rounded-md">
        <AccountProfile user={userData} btnTitle="Continue"/>
      </section>
    </main>
  )
}

export default Page;