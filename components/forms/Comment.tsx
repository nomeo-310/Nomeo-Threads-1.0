"use client"


import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { commentValidation } from '@/lib/validations/thread'
import Image from 'next/image'
import { createComment } from '@/lib/actions/thread.actions'

export interface commentProps {
  threadId: string
  currentUserId: string
  currentUserImage: string
}

const Comment = ({threadId, currentUserId, currentUserImage}: commentProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(commentValidation),
    defaultValues: {
      thread: '',
    }
  });

  const onSubmit = async (values: z.infer<typeof commentValidation>) => {

    await createComment(threadId, values.thread, currentUserId, pathname);
    form.reset();
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='comment-form'>
          <FormField control={form.control} name='thread' render={({field}) => (
            <FormItem className='flex w-full items-center gap-3'>
              <FormLabel>
                <Image 
                  src={currentUserImage} 
                  alt='current_user_image' 
                  width={48} 
                  height={48} 
                  className='rounded-full object-cover'
                />
              </FormLabel>
              <FormControl className=''>
                <Input 
                  type='text'
                  placeholder='Comment...'
                  className='no-focus border-none bg-transparent text-light-1'
                  {...field}
                />
              </FormControl>
              <FormMessage/>  
            </FormItem>
            )}/>
            <div className='flex justify-end'>
              <Button type='submit' className='bg-primary-500 py-2 lg:py-3 px-5 lg:px-7 rounded-full'>Reply</Button>
            </div>
        </form>
      </Form>
    </div>
  )
}

export default Comment;