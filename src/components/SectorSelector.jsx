'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useSearchParams, usePathname } from 'next/navigation'
import SectorButton from './sub/SectorButton'
import GeographySelector from './sub/GeographySelector'

export default function SectorSelector() {
	const [openGeographies, setOpenGeographies] = useState(false)
	const [selectedSector, setSelectedSector] = useState('')

	const urlParams = useSearchParams()
	const sectorParam = urlParams.get('s')

	const geoRef = useRef()
	const locale = useLocale()
	const router = useRouter()
	const pathname = usePathname()

	const handleClick = (sector) => {
		console.log('selectedSector', selectedSector)
		console.log('sector', sector)
		if (sector == selectedSector) {
			console.log('same sector')
			router.push(pathname)
			return
		} else {
			console.log('different sector')
			router.push(`${pathname}?s=${sector}`)
			setTimeout(() => {
				geoRef.current?.scrollIntoView({ behavior: 'smooth' })
			}, 100)
		}
	}

	useEffect(() => {
		if (sectorParam) {
			setSelectedSector(sectorParam)
			setOpenGeographies(true)
		} else {
			setSelectedSector('')
			setOpenGeographies(false)
		}
		//eslint-disable-next-line
	}, [locale, urlParams])

	return (
		<div>
			<div className="flex flex-col xl:flex-row items-center justify-center gap-4 xl:gap-12 mx-auto mt-10 xl:mt-12 3xl:mt-24">
				{selectedSector !== 'Aviation' ? (
					<SectorButton
						text={'E-Mobility'}
						handler={() => handleClick('E-Mobility')}
						activeButton={selectedSector}
					/>
				) : null}
				{selectedSector !== 'E-Mobility' ? (
					<SectorButton
						text={'Aviation'}
						handler={() => handleClick('Aviation')}
						activeButton={selectedSector}
					/>
				) : null}
			</div>
			<div ref={geoRef}>{openGeographies && <GeographySelector />}</div>
		</div>
	)
}
