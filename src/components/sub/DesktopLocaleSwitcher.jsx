'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTransition } from 'react'
import { useRouter, usePathname } from '@/navigation'
import { useLocale } from 'next-intl'
import { useSearchParams } from 'next/navigation'

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

const locales = ['en', 'de', 'fr', 'es', 'ro']

const LocaleElement = ({ locale, handler }) => {
	const text = locale.toUpperCase()
	return (
		<motion.li
			variants={itemVariants}
			className=""
		>
			<motion.span
				onClick={handler}
				id={locale}
				variants={actionIconVariants}
				className="flex items-center justify-center font-unna font-normal text-base xl:text-lg text-white bg-secondary w-12 xl:w-16 py-1 cursor-pointer hover:brightness-95 hover:shadow-xl"
			>
				{text}
			</motion.span>
		</motion.li>
	)
}

const getFullUrl = (pathname, searchParams) => {
	return `${pathname}?${searchParams.toString()}`
}

export default function DesktopLocaleSwitcher() {
	const [open, setOpen] = useState(false)
	const locale = useLocale()
	const router = useRouter()
	const [isPending, startTransition] = useTransition()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	console.log(pathname)
	console.log('searchparams', searchParams.toString())

	function changeLocale(event) {
		const nextLocale = event.target.id
		console.log(nextLocale)
		startTransition(() => {
			router.replace(getFullUrl(pathname, searchParams), {
				locale: nextLocale,
			})
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
					className="flex items-center justify-center gap-2 font-unna font-normal text-base xl:text-lg text-white bg-secondary w-12 xl:w-16 py-1 hover:brightness-95 hover:shadow-xl"
				>
					{locale.toUpperCase()}
				</button>

				<motion.ul
					initial={wrapperVariants.closed}
					variants={wrapperVariants}
					style={{ originY: 'top', translateX: '-50%' }}
					className="flex flex-col items-center shadow-xl absolute top-[100%] left-[50%] overflow-hidden"
				>
					{locales.map((loc) => {
						if (loc !== locale) {
							return (
								<LocaleElement
									key={loc}
									locale={loc}
									handler={changeLocale}
								/>
							)
						}
						return null
					})}
				</motion.ul>
			</motion.div>
		</div>
	)
}
