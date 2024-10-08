import type { Metadata } from 'next'
import './globals.css'
import { unstable_setRequestLocale } from 'next-intl/server'
import HeaderWrapper from '@/components/HeaderWrapper'
import { jose, unna } from '../fonts'
import { locales } from '../../navigation'
import { Suspense } from 'react'
import Loading from '@/components/Loading'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

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
			<body className="relative pb-24 xl:pb-40 min-h-screen">
				<Suspense fallback={<Loading />}>
					<HeaderWrapper></HeaderWrapper>
					<main>{children}</main>
					<Footer />
				</Suspense>
			</body>
		</html>
	)
}
