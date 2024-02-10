import { SortOrder } from "mongoose"

export interface itemProps {
  route: string
  label: string
  imgURL: string
  isActive: boolean
}

export interface userDataProps {
  id: string | undefined
  _id: string 
  username: string 
  name: string 
  bio: string 
  image: string 
}

export interface updateUserProps {
  userId: string 
  username: string 
  bio: string 
  image: string 
  path: string 
  name: string
}

export interface accountProfileProps {
  user:any
  btnTitle: string
}

export interface createThreadProps {
  thread: string
  author: string
  communityId: string | null
  path: string
  threadImage: string
}

export interface singleThreadProps {
  id: string
  currentUser: string
  parentId: string
  thread: string
  threadImage: string
  author: { name:string, image:string, id: string, username:string, _id:string, followings:string[], followers:string[]}
  community: { name: string; image: string; id: string } | null
  createdAt: string
  comments: [{author: { image:string}}]
  isComment?: boolean
  likes: string[]
}

export interface controlButtonProps {
  path:string
  likes: string[]
  threadId: any
  userId: string
}

export interface profileAvatarProps {
  path: string
  imageSrc: string
  authorId: string
  userId: string
  followers: string[]
}

export interface profileHeaderProps {
  accountId:string
  loggedInUserId:string
  name:string
  username:string
  image:string
  bio:string
  followers:string[]
}

export interface profileHeaderAvatarProps {
  alreadyAFollower:boolean 
  currentUserLoggedIn:boolean
  image:string
  accountId:string
  loggedInUserId:string
}

export interface fetchUserProps {
  userId:string,
  searchString?:string
  pageNumber?:number
  pageSize?:number
  sortBy?:SortOrder
}

export interface fetchCommunitiesProps {
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}
