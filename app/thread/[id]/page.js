import { supabase } from '@/lib/supabaseClient'
import NewPostForm from '@/components/NewPostForm'

export const metadata = {
  title: 'Thread'
}

export default async function ThreadPage({ params }) {
  const { id } = params

  const { data: thread, error: threadError } = await supabase
    .from('threads')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  const { error } = await supabase
    .from('threads')
    .select('*')

  console.log("ERROR:", error)
  console.log("URL param id:", id)

  if (threadError || !thread) {
    return <div>Thread not found</div>
  }

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