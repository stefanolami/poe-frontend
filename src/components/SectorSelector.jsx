'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useMyContext } from '@/app/context-provider'
import SectorButton from './sub/SectorButton'
import GeographySelector from './sub/GeographySelector'

export default function SectorSelector() {
	const [openGeographies, setOpenGeographies] = useState(false)
	const [selectedSector, setSelectedSector] = useState('')

	const router = useRouter()
	const locale = useLocale()

	const handleClick = (sector) => {
		if (sector == selectedSector) {
			setSelectedSector('')
			setOpenGeographies(false)
			return
		}
		setSelectedSector(sector)
		setOpenGeographies(true)
		console.log(selectedSector)
	}

	return (
		<div>
			<div className="flex flex-col xl:flex-row items-center justify-center gap-4 xl:gap-12 mx-auto mt-10 xl:mt-12">
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
			{openGeographies && <GeographySelector />}
		</div>
	)
}
