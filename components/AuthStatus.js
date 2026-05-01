'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function AuthStatus() {
	const [user, setUser] = useState(null)

	useEffect(() => {
		// initial session load
		supabase.auth.getSession().then(({ data }) => {
			setUser(data.session?.user ?? null)
		})

		// listen for login/logout events
		const { data: listener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setUser(session?.user ?? null)
			}
		)

		return () => listener.subscription.unsubscribe()
	}, [])

	return (
		<div>
			{user ? (
				<p>Logged in as: {user.email}</p>
			) : (
				<p>Not logged in</p>
			)}
		</div>
	)
}