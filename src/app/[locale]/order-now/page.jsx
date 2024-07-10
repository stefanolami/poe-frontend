import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import Hero from '@/components/Hero'
import EMobilitySelection from '@/components/EMobilitySelection'
import Loading from '../../../components/Loading'

export async function generateMetadata({ params: { locale } }) {
	const t = await getTranslations({
		locale,
		namespace: 'Index' /* replace with metadata file */,
	})

	return {
		title: t('title'),
	}
}

export default function OrderNowPage({ params: { locale } }) {
	unstable_setRequestLocale(locale)
	const t = useTranslations('Index')
	return (
		<>
			<Hero />
			<Loading />
		</>
	)
}
