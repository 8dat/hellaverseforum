import { supabase } from '@/lib/supabaseClient'
import GoogleLoginButton from '@/components/GoogleLoginButton'
import Link from 'next/link'

export default async function Home() {
	const { data: threads } = await supabase
		.from('threads')
		.select('*')
		.order('created_at', { ascending: false })

	return (
		<div>
			<h1>RP Forum</h1>

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

			<div>
				<h1>RP Forum</h1>
				<GoogleLoginButton />
			</div>

		</div>
	)
}