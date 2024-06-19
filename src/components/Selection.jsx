'use client'

import { useState, useEffect } from 'react'
import { useMyContext } from '@/app/context-provider'
import { setCookie, getCookie } from 'cookies-next'
import { useLocale } from 'next-intl'

export default function Selection() {
	const [localSector, setLocalSector] = useState()
	const [localGeographies, setLocalGeographies] = useState()
	const { geographies, selectedSector } = useMyContext()

	const locale = useLocale()

	useEffect(() => {
		const sectorCookie = getCookie('selectedSector')
		const geographiesCookie = getCookie('geographies')
		if (geographies.length == 0) {
			setLocalSector(JSON.parse(sectorCookie))
			setLocalGeographies(JSON.parse(geographiesCookie))
		} else {
			setLocalSector(selectedSector)
			setLocalGeographies(geographies)
		}
	}, [locale])

	return (
		<div className="mt-16">
			<div className="">
				<div className="mx-auto font-unna font-bold text-base xl:text-4xl flex items-center justify-center bg-secondary overflow-hidden text-white w-40 xl:w-96 h-9 xl:h-20">
					{localSector?.label}
				</div>
				<div className="mx-auto font-unna font-bold text-base xl:text-4xl flex items-center justify-center bg-primary overflow-hidden text-white w-40 xl:w-96 h-9 xl:h-20">
					{localGeographies}
				</div>
			</div>
		</div>
	)
}
