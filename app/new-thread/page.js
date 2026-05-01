'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function NewThread() {
  const [title, setTitle] = useState('')
  const router = useRouter()

  async function createThread() {
    const { data: { user } } = await supabase.auth.getUser()

    const { data: thread } = await supabase
      .from('threads')
      .insert({
        title,
        author_id: user.id
      })
      .select()
      .single()

    router.push(`/thread/${thread.id}`)
  }

  return (
    <div>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Thread title"
      />

      <button onClick={createThread}>
        Create
      </button>
    </div>
  )
}