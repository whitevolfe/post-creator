'use client'

import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { createPost } from '@/actions/create-post'

export default function CreateForm() {
  const router = useRouter()
  const [state, formAction] = useActionState(createPost, null)

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full">
      <form 
        action={async (formData) => {
          await formAction(formData)
          router.refresh()
        }}
        className="space-y-4 max-w-lg mx-auto"
      >
        <div>
          <label className="block text-sm font-medium mb-1 text-center" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            placeholder="Enter post title"
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-center" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="Write your post content..."
            required
            rows={4}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex justify-center items-center gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Post
          </button>

          {state?.message && (
            <p className="text-green-600 text-sm">{state.message}</p>
          )}
          {state?.error && (
            <p className="text-red-600 text-sm">{state.error}</p>
          )}
        </div>
      </form>
    </div>
  )
}