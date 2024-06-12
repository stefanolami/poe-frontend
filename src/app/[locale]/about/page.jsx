import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import HomePage from '@/components/HomePage'
import Hero from '@/components/Hero'
import LocaleSwitcher from '@/components/LocaleSwitcher'

export async function generateMetadata({ params: { locale } }) {
	const t = await getTranslations({
		locale,
		namespace: 'Index' /* replace with metadata file */,
	})

	return {
		title: t('title'),
	}
}

export default function About({ params: { locale } }) {
	unstable_setRequestLocale(locale)
	const t = useTranslations('Index')
	const heroMessage = t('hero')
	return (
		<>
			<HomePage title={t('title')}>
				<Hero hero={heroMessage} />
			</HomePage>
			<LocaleSwitcher />
			<p>about page</p>
		</>
	)
}
