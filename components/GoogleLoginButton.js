'use client'

import { supabase } from '@/lib/supabaseClient'

export default function GoogleLoginButton() {
  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    })
  }

  return (
    <button onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  )
}