'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useMyContext } from '@/app/context-provider'
import SectorButton from './sub/SectorButton'
import GeographySelector from './sub/GeographySelector'

export default function SectorSelector() {
	const [openGeographies, setOpenGeographies] = useState(false)
	/* const [selectedSector, setSelectedSector] = useState('') */

	const { selectedSector, setSelectedSector } = useMyContext()

	const geoRef = useRef()

	const handleClick = (sector) => {
		if (sector == selectedSector) {
			setSelectedSector('')
			setOpenGeographies(false)
			return
		}
		setSelectedSector(sector)
		setOpenGeographies(true)
		console.log(selectedSector)
		setTimeout(() => {
			geoRef.current?.scrollIntoView({ behavior: 'smooth' })
		}, 100)
	}

	return (
		<div>
			<div className="flex flex-col xl:flex-row items-center justify-center gap-4 xl:gap-12 mx-auto mt-10 xl:mt-12 3xl:mt-24">
				{selectedSector !== 'aviation' ? (
					<SectorButton
						text={'E-Mobility'}
						handler={() => handleClick('e-mobility')}
						activeButton={selectedSector}
					/>
				) : null}
				{selectedSector !== 'e-mobility' ? (
					<SectorButton
						text={'Aviation'}
						handler={() => handleClick('aviation')}
						activeButton={selectedSector}
					/>
				) : null}
			</div>
			<div ref={geoRef}>{openGeographies && <GeographySelector />}</div>
		</div>
	)
}
