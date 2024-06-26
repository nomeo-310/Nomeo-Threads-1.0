import React from 'react';

const RightSideBar = () => {
  return (
    <section className='custom-scrollbar rightsidebar'>
      <div className="flex flex-1 flex-col justify-start">
        <h2 className='text-heading4-medium text-light-1'>Suggested Communities</h2>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h2 className='text-heading4-medium text-light-1'>Suggested Users</h2>
      </div>
    </section>
  )
}

export default RightSideBar