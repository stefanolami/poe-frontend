'use client'
import { useState } from 'react'

export default function HomePage({ title, children }) {
	const [count, setCount] = useState(0)
	return (
		<div>
			<h1>{title}</h1>
			{children}
		</div>
	)
}
