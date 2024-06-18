'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTransition } from 'react'
import { useRouter, usePathname } from '@/navigation'
import Image from 'next/image'
import { useLocale } from 'next-intl'

const wrapperVariants = {
	open: {
		scaleY: 1,
		transition: {
			staggerChildren: 0.1,
			duration: 0.1,
		},
	},
	closed: {
		scaleY: 0,
		transition: {
			staggerChildren: 0.1,
			duration: 0.1,
		},
	},
}

const itemVariants = {
	open: {
		opacity: 1,
		y: 0,
	},
	closed: {
		opacity: 0,
		y: -15,
	},
}

const actionIconVariants = {
	open: { scale: 1, y: 0 },
	closed: { scale: 0, y: -7 },
}

const LocaleElement = ({ locale, icon, handler }) => {
	return (
		<motion.li
			variants={itemVariants}
			className="flex items-center justify-center gap-2 w-full py-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-beige3 hover:shadow-md text-white hover:text-black transition-colors cursor-pointer"
		>
			<motion.span variants={actionIconVariants}>
				<Image
					onClick={handler}
					id={locale}
					src={icon}
					alt="logo"
					width="40"
					height="40"
				/>
			</motion.span>
		</motion.li>
	)
}

export default function DesktopLocaleSwitcher() {
	const [open, setOpen] = useState(false)
	const locale = useLocale()
	const router = useRouter()
	const [isPending, startTransition] = useTransition()
	const pathname = usePathname()
	const icons = ['/romania.png', '/uk.png']
	const roIcon = icons[0]
	const ukIcon = icons[1]
	const expandArrow = '/expand-arrow.png'
	const collapseArrow = '/collapse-arrow.png'

	function changeLocale(event) {
		const nextLocale = event.target.id
		console.log(nextLocale)
		startTransition(() => {
			router.replace(pathname, { locale: nextLocale })
		})
		console.log('changing')
	}

	return (
		<div className="flex items-center justify-center">
			<motion.div
				animate={open ? 'open' : 'closed'}
				className="relative"
			>
				<button
					onClick={() => setOpen((pv) => !pv)}
					className="flex items-center rounded-md gap-2"
				>
					<Image
						src={locale === 'ro' ? roIcon : ukIcon}
						alt="logo"
						width="40"
						height="40"
						className=""
					/>
					{/* <Image
						src={open ? collapseArrow : expandArrow}
						alt="dropdown arrow"
						width="15"
						height="15"
						className=""
					/> */}
				</button>

				<motion.ul
					initial={wrapperVariants.closed}
					variants={wrapperVariants}
					style={{ originY: 'top', translateX: '-50%' }}
					className="flex flex-col items-center w-16 gap-2 p-2 rounded-lg text-white border border-beige3 shadow-xl absolute top-[120%] left-[50%] overflow-hidden"
				>
					{/* <motion.li
						variants={itemVariants}
						className="flex items-center justify-center gap-2 w-full py-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-beige3 hover:shadow-md text-white hover:text-black transition-colors cursor-pointer"
					>
						<motion.span variants={actionIconVariants}>
							<Image
								onClick={changeLocale}
								id="ro"
								src={roIcon}
								alt="logo"
								width="40"
								height="40"
							/>
						</motion.span>
					</motion.li>
					<motion.li
						variants={itemVariants}
						className="flex items-center justify-center gap-2 w-full py-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-beige3 hover:shadow-md text-white hover:text-black transition-colors cursor-pointer"
					>
						<motion.span variants={actionIconVariants}>
							<Image
								onClick={changeLocale}
								id="en"
								src={ukIcon}
								alt="logo"
								width="40"
								height="40"
							/>
						</motion.span>
					</motion.li> */}
					<LocaleElement
						locale="en"
						icon={ukIcon}
						handler={changeLocale}
					/>
					<LocaleElement
						locale="ro"
						icon={roIcon}
						handler={changeLocale}
					/>
				</motion.ul>
			</motion.div>
		</div>
	)
}
