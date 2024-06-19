'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useMyContext } from '@/app/context-provider'
import { setCookie, getCookie, deleteCookie } from 'cookies-next'
import SectorButton from './sub/SectorButton'
import GeographySelector from './sub/GeographySelector'

export default function SectorSelector() {
	const [openGeographies, setOpenGeographies] = useState(false)
	/* const [selectedSector, setSelectedSector] = useState('') */

	const { selectedSector, setSelectedSector } = useMyContext()

	const geoRef = useRef()
	const locale = useLocale()

	const handleClick = (sector) => {
		console.log('selectedSector', selectedSector)
		console.log('sector', sector)
		if (sector.value == selectedSector.value) {
			console.log('same sector')
			setSelectedSector({})
			deleteCookie('selectedSector')
			setOpenGeographies(false)
			deleteCookie('openGeographies')
			return
		} else {
			console.log('different sector')
			setSelectedSector(sector)
			setCookie('selectedSector', JSON.stringify(sector))
			setOpenGeographies(true)
			setCookie('openGeographies', true)
			setTimeout(() => {
				geoRef.current?.scrollIntoView({ behavior: 'smooth' })
			}, 100)
		}
	}

	useEffect(() => {
		const localSector = getCookie('selectedSector')
		const localOpenGeographies = getCookie('openGeographies')
		if (localSector) {
			setSelectedSector(JSON.parse(localSector))
		} else {
			setSelectedSector({})
		}

		if (localOpenGeographies) {
			setOpenGeographies(true)
		} else {
			setOpenGeographies(false)
		}
		console.log('localSector', selectedSector)
	}, [locale])

	return (
		<div>
			<div className="flex flex-col xl:flex-row items-center justify-center gap-4 xl:gap-12 mx-auto mt-10 xl:mt-12 3xl:mt-24">
				{selectedSector.value !== 'aviation' ? (
					<SectorButton
						text={'E-Mobility'}
						handler={() =>
							handleClick({
								value: 'e-mobility',
								label: 'E-Mobility',
							})
						}
						activeButton={selectedSector.value}
					/>
				) : null}
				{selectedSector.value !== 'e-mobility' ? (
					<SectorButton
						text={'Aviation'}
						handler={() =>
							handleClick({
								value: 'aviation',
								label: 'Aviation',
							})
						}
						activeButton={selectedSector.value}
					/>
				) : null}
			</div>
			<div ref={geoRef}>{openGeographies && <GeographySelector />}</div>
		</div>
	)
}
