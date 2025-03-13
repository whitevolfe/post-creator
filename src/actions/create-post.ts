'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createPost(prevState: any, formData: FormData) {
  try {
    await prisma.post.create({
      data: {
        title: formData.get('title') as string,
        content: formData.get('content') as string
      }
    })
    
    // Revalidate the homepage cache
    revalidatePath('/')
    
    return { message: 'Post created!', error: null }
  } catch (error) {
    console.error('Creation error:', error)
    return { message: null, error: 'Failed to create post' }
  }
}