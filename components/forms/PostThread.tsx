"use client"

import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { threadValidation } from '@/lib/validations/thread'
import { z } from 'zod'
import { isBase64Image } from '@/lib/utils'
import { useUploadThing } from '@/lib/useUploadThing'
import { usePathname, useRouter } from 'next/navigation'
import { createThread } from '@/lib/actions/thread.actions'

type postThreadProps = {
  userId: string
}

const PostThread = ({userId}:postThreadProps) => {

  const [files, setFiles] = React.useState<File[]>([]);
  const [isLoading, setIsloading] = React.useState(false)
  const { startUpload } = useUploadThing("postImageUploader");

  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(threadValidation),
    defaultValues: {
      thread_image: '',
      thread: '',
      accountId: userId
    }
  });

  const handleThreadImage = (e:React.ChangeEvent<HTMLInputElement>, fieldChange: (value:string) => void) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes('image')) return

      fileReader.onload = async (event) => {
        const imageDateUrl = event.target?.result?.toString() || '';
        fieldChange(imageDateUrl)
      }
      fileReader.readAsDataURL(file);
    }
  }

  const onSubmit = async (values: z.infer<typeof threadValidation>) => {
    setIsloading(true)
    const blob = values.thread_image;
    const imageHasChanged = isBase64Image(blob);

    if (imageHasChanged) {
      const imageResponse = await startUpload(files);

      if (imageResponse && imageResponse[0].url) {
        values.thread_image = imageResponse[0].url;
      }
    }

    const threadData = {
      thread: values.thread, 
      threadImage: values.thread_image, 
      author: userId, 
      communityId: null, 
      path: pathname
    };

    await createThread(threadData);
    setIsloading(false);
    router.push('/');
  }

  return (
    <React.Fragment>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col justify-start gap-5'>
          <FormField control={form.control} name='thread_image' render={({field}) => (
            <FormItem className='flex flex-col'>
              <div className={`${field.value ? 'h-[250px]' : ''} relative w-full rounded`}>
                { field.value && 
                  <Image 
                    src={field.value} 
                    alt='profile_photo' 
                    fill
                    priority 
                    className='object-cover rounded'
                  /> 
                }
              </div>
              <div className='flex items-center'>
                <FormLabel>
                  <Image 
                    src='/assets/profile.svg' 
                    alt='profile_photo' 
                    width={32} 
                    height={32} 
                    priority 
                    className='object-cover'
                  />
                </FormLabel>
                <FormControl className='flex-1 text-base-semibold text-gray-200'>
                  <Input 
                    type='file' 
                    accept='image/*' 
                    placeholder='upload a photo' 
                    className='account-form_image-input'
                    onChange={(e) => handleThreadImage(e, field.onChange)}
                  />
                </FormControl>
              </div>
            </FormItem>
            )}/>
          <FormField control={form.control} name='thread' render={({field}) => (
            <FormItem className='flex flex-col gap-3 w-full'>
              <FormLabel className='text-base-semibold text-light-2'>Thread</FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Textarea
                  rows={8}
                  {...field}
                />
              </FormControl>
              <FormMessage/> 
            </FormItem>
            )}/>
            <div className='flex justify-end'>
              <Button type='submit' className='bg-primary-500 py-2 lg:py-3 px-5 lg:px-7 rounded-full' disabled={isLoading}>{isLoading ? '...Creating Thread' : 'Post Thread'}</Button>
            </div>
        </form>
      </Form>
    </React.Fragment>
  )
}

export default PostThread;