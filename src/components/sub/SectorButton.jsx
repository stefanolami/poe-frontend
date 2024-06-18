'use client'

import React from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useMyContext } from '@/app/context-provider'

const SectorButton = ({ text, handler, activeButton }) => {
	const controlsText = useAnimation()
	const controlsArrow = useAnimation()
	const [isHovered, setIsHovered] = React.useState(false)
	const { geographies, setGeographies } = useMyContext()

	const handleMouseEnter = () => {
		setIsHovered(true)
		controlsText.start({ x: -10 })
		controlsArrow.start({ opacity: 1, x: 0 })
	}

	const handleMouseLeave = () => {
		setIsHovered(false)
		if (activeButton !== text.toLowerCase()) {
			controlsText.start({ x: 0 })
			controlsArrow.start({ opacity: 0, x: 10 })
		}
	}

	const handleClick = () => {
		setGeographies(['new geo'])
		console.log(geographies)
	}

	return (
		<motion.button
			className="relative flex items-center justify-center bg-secondary hover:brightness-95 overflow-hidden text-white w-40 xl:w-96 h-9 xl:h-20"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={() => handler(text.toLowerCase())}
		>
			<motion.span
				className="relative z-10 font-unna font-bold text-base xl:text-4xl"
				animate={controlsText}
				initial={{ x: 0 }}
			>
				{text}
			</motion.span>
			<motion.span
				className="absolute right-4 xl:text-5xl"
				animate={controlsArrow}
				initial={{ opacity: 0, x: 10 }}
				transition={{ duration: 0.3 }}
			>
				→
			</motion.span>
		</motion.button>
	)
}

export default SectorButton
