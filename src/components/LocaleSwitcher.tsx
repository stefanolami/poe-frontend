import { useLocale, useTranslations } from 'next-intl'
import LocaleSwitcherSelect from './LocaleSwitcherSelect'

export default function LocaleSwitcher() {
	const t = useTranslations('LocaleSwitcher')
	const locale = useLocale()
	const locales = ['ro', 'en']

	return (
		<LocaleSwitcherSelect
			defaultValue={locale}
			label="change locale"
		>
			{locales.map((cur) => (
				<option
					key={cur}
					value={cur}
				>
					{cur}
				</option>
			))}
		</LocaleSwitcherSelect>
	)
}
