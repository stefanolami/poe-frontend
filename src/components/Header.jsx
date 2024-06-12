'use client'

import Navbar from './Navbar'

export default function Header(messages) {
	const navTrans = messages?.messages?.Navigation
	return (
		<header className="bg-white text-black mx-auto w-1/2">
			<Navbar messages={navTrans} />
		</header>
	)
}
