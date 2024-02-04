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