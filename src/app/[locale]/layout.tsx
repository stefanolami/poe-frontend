import type { Metadata } from 'next'
import './globals.css'
import { unstable_setRequestLocale } from 'next-intl/server'
import Header from '@/components/Header'
import HeaderWrapper from '@/components/HeaderWrapper'
import { jose, unna } from '../fonts'

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

// Can be imported from a shared config
const locales = ['ro', 'en']

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }))
}

export default function LocaleLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return (
		<html
			lang={locale}
			className={`${jose.variable} ${unna.variable}`}
		>
			<body>
				<HeaderWrapper></HeaderWrapper>
				<main>{children}</main>
			</body>
		</html>
	)
}
