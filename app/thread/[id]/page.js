import { supabase } from '@/lib/supabaseClient'
import NewPostForm from '@/components/NewPostForm'

export const metadata = {
  title: 'Thread'
}

export default async function ThreadPage({ params }) {
  const { id } = params

  const { data: thread } = await supabase
    .from('threads')
    .select('*')
    .eq('id', id)
    .single()

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('thread_id', id)
    .order('created_at')

  return (
    <div>
      <h1>{thread.title}</h1>

      <div>
        {posts?.map(post => (
          <div key={post.id}>
            <p>{post.content}</p>
          </div>
        ))}
      </div>

      <NewPostForm threadId={id} />
    </div>
  )
}