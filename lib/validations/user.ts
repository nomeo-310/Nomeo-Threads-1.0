import * as z from 'zod'

export const userValidation = z.object({
  profile_photo: z.string().url().min(1),
  name: z.string().min(3, {message: 'Minimum of 3 characters'}).max(30),
  username: z.string().min(3, {message: 'Minimum of 3 characters'}).max(30),
  bio: z.string().min(10, {message: 'Minimum of 10 characters'}).max(1000)
})