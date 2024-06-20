'use client'

import { useState, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { useSearchParams, useRouter } from 'next/navigation'

export default function Selection() {
	const [sector, setSector] = useState('')
	const [geographies, setGeographies] = useState([])

	const locale = useLocale()
	const router = useRouter()
	const urlParams = useSearchParams()
	const sectorParam = urlParams.get('s')
	const geoParams = urlParams.get('geo')

	useEffect(() => {
		if (sectorParam) {
			setSector(sectorParam)
		} else {
			router.replace(`/${locale}`)
		}
		if (geoParams) {
			setGeographies(geoParams.split('_'))
		} else {
			router.replace(`/${locale}`)
		}

		//eslint-disable-next-line
	}, [locale])

	return (
		<div className="mt-16">
			<div className="">
				<div className="mx-auto font-unna font-bold text-base xl:text-4xl flex items-center justify-center bg-secondary overflow-hidden text-white w-40 xl:w-96 h-9 xl:h-20">
					{sector}
				</div>
				<div className="mx-auto font-unna font-bold text-base xl:text-4xl flex items-center justify-center bg-primary overflow-hidden text-white w-40 xl:w-96 h-9 xl:h-20">
					{geographies.join(', ')}
				</div>
			</div>
		</div>
	)
}
