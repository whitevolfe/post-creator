import { prisma } from '@/lib/prisma'
import CreateForm from '@/components/create-form'

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true
    }
  })

  return (
    <div className='flex justify-center'>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <main className="max-w-2xl mx-auto py-8">
          <div className="flex flex-col items-center w-full">
            <h1 className="text-3xl font-bold mb-6 text-center">Latest Posts</h1>
            
            <div className="w-full mb-8">
              <CreateForm />
            </div>

            <section className="w-full space-y-4">
              {posts.map(post => (
                <article key={post.id} className="post-card p-6 border rounded-lg shadow-sm bg-white w-full">
                  <h2 className="post-title text-xl font-semibold mb-2 text-center">{post.title}</h2>
                  <p className="post-content mb-4 text-center">{post.content}</p>
                  <time className="post-timestamp text-sm text-gray-600 block text-center">
                    Posted: {new Date(post.createdAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </time>
                </article>
              ))}
            </section>
          </div>
        </main>
      </div>
    </div>
    </div>
  )
}