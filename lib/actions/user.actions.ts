"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import Thread from "../models/thread.model";
import { connectToDataBase } from "../mongoose"
import { fetchUserProps, updateUserProps } from "@/types/types";
import { FilterQuery } from "mongoose";


export const updateUser = async ({userId, username, bio, image, path, name}: updateUserProps):Promise<void> => {
  
  const updateData = {
    id: userId,
    username: username.toLowerCase(),
    name: name,
    bio: bio,
    image: image, 
    onboarded: true
  }
  
  try {
    connectToDataBase();
    await User.findOneAndUpdate({id: userId}, updateData, {upsert: true});

    if (path === '/profile/edit') {
      revalidatePath(path)
    }

  } catch (error:any) {
    throw new Error(`Failed to create or update user: ${error.message}`)
  }
}

export const fetchUser = async (userId:string) => {

  try {
    connectToDataBase()
    return await User.findOne({id:userId})
    // .populate({
    //   path: 'communities',
    //   model: 'Community'
    // })
  } catch (error:any) {
    throw new Error(`Failed to fetch user: ${error.message}`)
  }
}

export const followUser = async(authorId:string, userId:string, path:string) => {
  try {
    connectToDataBase();
    const author = await User.findOne({id: authorId});
    const user = await User.findOne({id: userId});

    const alreadyFollowing = author.followers.includes(userId);
    if (alreadyFollowing) {
      user.followings.pull(authorId)
      author.followers.pull(userId)
    } else {
      user.followings.push(authorId)
      author.followers.push(userId)
    }
    author.save();
    user.save();
    revalidatePath(path);
  } catch (error:any) {
    throw new Error(`Failed to follow user: ${error.message}`)
  }
}

export const fetchUserThreads = async(userId:string) => {
  try {
    connectToDataBase()
    const threads = await User.findOne({id: userId})
    .populate({
      path: 'threads',
      model: Thread,
      populate: {
        path: 'children',
        model: Thread,
        populate: {
          path: 'author',
          model: User,
          select: 'name username id _id followers followings image'
        }
      }
    })
    return threads;
  }catch (error:any) {
    throw new Error(`Failed to fetch user's threads: ${error.message}`)
  }
}

export const fetchUsersFollowersAndFollowings = async(userId:string) => {
  try {
    connectToDataBase();
    const user = await User.findOne({id: userId});
    const followers:any = await Promise.all(user.followers.map((id:string) => User.findOne({id: userId})))
    const followings:any = await Promise.all(user.followings.map((id:string) => User.findOne({id: userId})))
    return { followers, followings }
  } catch (error:any) {
    throw new Error(`Failed to follow user: ${error.message}`)
  }
}

export const fetchAllUsers = async ({userId, searchString = '', pageNumber = 1, pageSize = 20, sortBy = 'desc'}:fetchUserProps) => {
  try {
    connectToDataBase();
    const skipAmount = (pageNumber - 1) * pageSize;
    const regEx = new RegExp(searchString, 'i');
    const query:FilterQuery<typeof User> = {id: {$ne: userId}}

    if (searchString.trim() !== '') {
      query.$or = [{username: {$regex: regEx}}, {name: {$regex: regEx}}]
    }

    const sortOptions = {createdAt: sortBy}
    const userQuery = User.find(query)
    .sort(sortOptions)
    .skip(skipAmount)
    .limit(pageSize)

    const totalUsers = await User.countDocuments(query);

    const users = await userQuery.exec();
    const isNext = totalUsers > skipAmount + users.length;
    return {users, isNext}
  } catch (error:any) {
    throw new Error(`Failed to fetch all users: ${error.message}`)
  }
}

export const fetchActivity = async (userId:string) => {
  try {
    connectToDataBase();
    const userThreads = await Thread.find({author: userId});
    const childThreadIds = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.children)
    }, []);
    const replies = await Thread.find({_id: {$in: childThreadIds}, author: {$ne: userId}})
    .populate({
      path: 'author',
      model: User,
      select: 'name username id _id image'
    }).populate({path: 'createdAt'})
    return replies;
  }  catch (error:any) {
    throw new Error(`Failed to fetch activities: ${error.message}`)
  }
}

export const fetchUserReplies = async (userId:string) => {
  try {
    connectToDataBase();
    const userThreads = await Thread.find();
    const childThreadIds = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.children)
    }, []);
    const replies = await Thread.find({_id: {$in: childThreadIds}, author: userId})
    .populate({
      path: 'author',
      model: User,
      select: 'name username id _id image'
    }).populate({path: 'createdAt'})
    return replies;
  }  catch (error:any) {
    throw new Error(`Failed to fetch activities: ${error.message}`)
  }
}
