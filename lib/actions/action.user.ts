"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDataBase } from "../mongoose"
import { updateUserProps } from "@/types/types";

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