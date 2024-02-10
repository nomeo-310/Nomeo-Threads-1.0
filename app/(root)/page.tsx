import React from "react";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";
import SingleThread from "@/components/cards/SingleThread";

export default async function Home() {
  const user = await currentUser();
  if (!user) return null;
  const response = await fetchThreads(1, 20);
  return (
    <>
      <h2 className="head-text text-left">Home</h2>
      <section className="mt-9 flex flex-col gap-8">
        { response.posts.length === 0 ? 
          <p className="no-result">No threads found</p> :
          <React.Fragment>
            {response.posts.map((post) => (
              <SingleThread 
                key={post._id}
                id={post._id}
                currentUser={user.id ? user.id : ''}
                parentId={post.parentId}
                thread={post.thread}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
                threadImage={post.threadImage}
                likes={post.likes}
              />
              ))}
          </React.Fragment>
        }
      </section>
    </>
  );
}
