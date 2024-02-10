"use server"

import { createThreadProps } from "@/types/types"
import { connectToDataBase } from "../mongoose"
import Thread from "../models/thread.model"
import User from "../models/user.model"
import { revalidatePath } from "next/cache"

export const createThread = async({thread, threadImage, path, communityId, author}:createThreadProps) => {
  connectToDataBase();
  try {
    const createdThread = await Thread.create({
      thread, threadImage, community: null, author
    });
    createdThread.save();

    await User.findOneAndUpdate({_id: author}, {$push: {threads: createdThread._id}});
    revalidatePath(path)
  } catch (error:any) {
    throw new Error(`Failed to create thread: ${error.message}`)
  }
}

export const fetchThreads = async(pageNumber:number, pageSize:number) => {
  connectToDataBase();
  const skipAmount = (pageNumber - 1) * pageSize;

  const postQuery = Thread.find({parentId: {$in: [null, undefined]}})
  .sort({createdAt: 'desc'})
  .skip(skipAmount)
  .limit(pageSize)
  .populate({path: 'author', model: User })
  .populate({path: 'children', populate: {
    path: 'author',
    model: User,
    select: '_id name parentId image username followers followings'
  }});

  const totalPostCount = await Thread.countDocuments({parentId: {$in: [null, undefined]}})
  const posts = await postQuery.exec();
  const isNext = totalPostCount > skipAmount + posts.length;
  return {posts, isNext}
}

export const fetchThreadById = async(id:string) => {
  connectToDataBase();
  try {
    const thread = await Thread.findById(id)
    .populate({
      path: 'author',
      model: User,
      select: 'id _id name image followers followings'
    })
    .populate({
      path: 'children',
      populate: [
        {
          path: 'author',
          model: User,
          select: '_id id name parentId image followers followings'
        },
        {
          path: 'children',
          model: Thread,
          populate: {
            path: 'author',
            model: User,
            select: '_id id name parentId image followers followings'
          }
        }
      ]
    }).exec();

    return thread
  } catch (error:any) {
    throw new Error(`Failed to fetch thread: ${error.message}`)
  }
}

export const createComment = async(threadId:string, thread:string, userId:string, path:string) => {
  connectToDataBase();
  try {
    const originalThread = await Thread.findById(threadId);
    if (!originalThread) {
      throw new Error('Thread not found')
    }
    const commentThread = new Thread({
      thread: thread,
      author: userId,
      parentId: threadId
    });

    const savedComment = await commentThread.save();
    originalThread.children.push(savedComment._id);
    await originalThread.save();

    revalidatePath(path)
  } catch (error:any) {
    throw new Error(`Failed to create comment: ${error.message}`)
  }
}

export const likeThread = async(threadId:any, userId:string, path:string) => {
  connectToDataBase();
  const thread = await Thread.findById(threadId);
  const userAlreadyLiked = thread.likes.includes(userId);
  try {
    if (userAlreadyLiked) {
      await Thread.findOneAndUpdate({_id: threadId}, {$pull: {likes: userId}})
    } else {
      await Thread.findOneAndUpdate({_id: threadId}, {$push: {likes: userId}}, {upsert: true})
    }
    await thread.save();
    revalidatePath(path)
  } catch (error:any) {
    throw new Error(`Failed to like thread: ${error.message}`)
  }
}