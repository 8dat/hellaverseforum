'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function NewPostForm({ threadId }) {
  const [content, setContent] = useState('')

  async function submitPost() {
    const { data: { user } } = await supabase.auth.getUser()

    await supabase.from('posts').insert({
      thread_id: threadId,
      content,
      author_id: user.id
    })

    setContent('')
    window.location.reload()
  }

  return (
    <div>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <button onClick={submitPost}>
        Reply
      </button>
    </div>
  )
}