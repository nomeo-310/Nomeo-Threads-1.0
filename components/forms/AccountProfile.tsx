"use client"

import Image from 'next/image'
import React from 'react'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userValidation } from '@/lib/validations/user';
import { z } from 'zod'
import { isBase64Image } from '@/lib/utils'
import { useUploadThing } from '@/lib/useUploadThing'
import { updateUser } from '@/lib/actions/action.user'
import { usePathname, useRouter } from 'next/navigation'

type Props = {
  user:any
  btnTitle: string
}

const AccountProfile = ({user, btnTitle}:Props) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [isLoading, setIsloading] = React.useState(false)
  const { startUpload } = useUploadThing("imageUploader");

  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(userValidation),
    defaultValues: {
      profile_photo: user?.image || '',
      username: user?.username || '',
      name: user?.name || '',
      bio: user?.bio || ''
    }
  });

  const handleImage = (e:React.ChangeEvent<HTMLInputElement>, fieldChange: (value:string) => void) => {
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

  const onSubmit = async (values: z.infer<typeof userValidation>) => {
    setIsloading(true)
    const blob = values.profile_photo;
    const imageHasChanged = isBase64Image(blob);

    if (imageHasChanged) {
      const imageResponse = await startUpload(files);

      if (imageResponse && imageResponse[0].url) {
        values.profile_photo = imageResponse[0].url;
      }
    }

    const userData = {userId: user.id, username: values.username, bio: values.bio, image: values.profile_photo, path: pathname, name: values.name};

    await updateUser(userData);
    setIsloading(false)
    if (pathname === '/profile/edit') {
      router.back();
    } else {
      router.push('/');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col justify-start gap-10'>
        <FormField control={form.control} name='profile_photo' render={({field}) => (
          <FormItem className='flex items-center gap-4'>
            <FormLabel className='account-form_image-label'>
              {field.value ? 
                <Image 
                  src={field.value} 
                  alt='profile_photo' 
                  width={96} 
                  height={96} 
                  priority 
                  className='rounded-full object-contain'
                /> : 
                <Image 
                  src='/assets/profile.svg' 
                  alt='profile_photo' 
                  width={24} 
                  height={24} 
                  priority 
                  className='object-contain'
                /> }
            </FormLabel>
            <FormControl className='flex-1 text-base-semibold text-gray-200'>
              <Input 
                type='file' 
                accept='image/*' 
                placeholder='upload a photo' 
                className='account-form_image-input'
                onChange={(e) => handleImage(e, field.onChange)}
              />
            </FormControl> 
          </FormItem>
          )}/>
        <FormField control={form.control} name='name' render={({field}) => (
          <FormItem className='flex flex-col gap-3 w-full'>
            <FormLabel className='text-base-semibold text-light-2'>Name</FormLabel>
            <FormControl>
              <Input 
                type='text' 
                className='account-form_input no-focus'
                {...field}
              />
            </FormControl> 
          </FormItem>
          )}/>
        <FormField control={form.control} name='username' render={({field}) => (
          <FormItem className='flex flex-col gap-3 w-full'>
            <FormLabel className='text-base-semibold text-light-2'>Username</FormLabel>
            <FormControl>
              <Input 
                type='text' 
                className='account-form_input no-focus'
                {...field}
              />
            </FormControl> 
          </FormItem>
          )}/>
        <FormField control={form.control} name='bio' render={({field}) => (
          <FormItem className='flex flex-col gap-3 w-full'>
            <FormLabel className='text-base-semibold text-light-2'>Bio</FormLabel>
            <FormControl>
              <Textarea
                rows={8}
                className='account-form_input no-focus'
                {...field}
              />
            </FormControl> 
          </FormItem>
          )}/>
        <Button type='submit' className='bg-primary-500' disabled={isLoading}>{isLoading ? '...Creating profile' : 'Submit'}</Button>
      </form>
    </Form>
  )
}

export default AccountProfile