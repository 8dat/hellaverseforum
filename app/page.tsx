import { supabase } from '@/lib/supabaseClient'
import GoogleLoginButton from '@/components/GoogleLoginButton'
import Link from 'next/link'
import AuthStatus from '@/components/AuthStatus'

export default async function Home() {
	const { data: threads } = await supabase
		.from('threads')
		.select('*')
		.order('created_at', { ascending: false })

	return (
		<div>
			<h1>RP Forum</h1>

			<AuthStatus />

			<Link href="/new-thread">Create Thread</Link>

			<ul>
				{threads?.map(thread => (
					<li key={thread.id}>
						<Link href={`/thread/${thread.id}`}>
							{thread.title}
						</Link>
					</li>
				))}
			</ul>

			<GoogleLoginButton />
		</div>
	)
}