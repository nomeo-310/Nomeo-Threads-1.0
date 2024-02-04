import React from 'react'

type postThreadProps = {
  userId: string
}

const PostThread = ({userId}:postThreadProps) => {
  console.log(userId)
  return (
    <div>PostThread</div>
  )
}

export default PostThread;