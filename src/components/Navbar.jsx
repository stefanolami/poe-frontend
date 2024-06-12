'use client'

import { Link } from '../navigation'

export default function Navbar({ messages }) {
	return (
		<div className="flex px-16 py-6 flex-row justify-between items-center">
			<nav className="flex flex-row justify-center items-center gap-4">
				<Link href="/about">{messages.about}</Link>
				<Link href="/prices">{messages.prices}</Link>
				<Link href="/deals">{messages.deals}</Link>
				<Link href="/gallery">{messages.gallery}</Link>
				<Link href="/contacts">{messages.contacts}</Link>
			</nav>
		</div>
	)
}
