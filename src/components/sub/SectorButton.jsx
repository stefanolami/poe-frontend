'use client'

import React from 'react'
import { motion, useAnimation } from 'framer-motion'

const SectorButton = ({ text }) => {
	/* const [isHovered, setIsHovered] = React.useState(false)

	const textContainerVariants = {
		rest: {
			x: 0,
			transition: { duration: 0.2 },
		},
		hover: {
			x: '-50%', // Adjust this value for desired text slide distance
			transition: { duration: 0.2 },
		},
	}

	const arrowVariants = {
		rest: {
			opacity: 0,
			transition: { duration: 0.2 },
		},
		hover: {
			opacity: 1,
			transition: { duration: 0.2 },
		},
	}

	return (
		<motion.button
			className={`flex items-center justify-center px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none ${className}`}
			whileHover={{ scale: 1.05 }} // Optional subtle hover scale
			onClick={onClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<motion.div
				className="font-unna font-bold text-base"
				variants={isHovered ? 'hover' : 'rest'}
			>
				E-Mobility
			</motion.div>
			<motion.svg
				variants={isHovered ? 'hover' : 'rest'}
				className="ml-2 h-4 w-4 fill-current"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M10.5 8.7l4.8 4.8-1.2 1.2-4.8-4.8z" />
			</motion.svg>
		</motion.button>
	) */
	const controlsText = useAnimation()
	const controlsArrow = useAnimation()
	const [isHovered, setIsHovered] = React.useState(false)

	const handleMouseEnter = () => {
		setIsHovered(true)
		controlsText.start({ x: -10 })
		controlsArrow.start({ opacity: 1, x: 0 })
	}

	const handleMouseLeave = () => {
		setIsHovered(false)
		controlsText.start({ x: 0 })
		controlsArrow.start({ opacity: 0, x: 10 })
	}

	return (
		<motion.button
			className="relative flex items-center justify-center bg-secondary hover:brightness-95 overflow-hidden text-white w-40 xl:w-96 h-9 xl:h-20"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
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
