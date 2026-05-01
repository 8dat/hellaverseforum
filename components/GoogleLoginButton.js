'use client'

import { supabase } from '@/lib/supabaseClient'

export default function GoogleLoginButton() {
  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://efyxtbzcwffzzkfphkqk.supabase.co/auth/v1/callback'
      }
    })
  }

  return (
    <button onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  )
}