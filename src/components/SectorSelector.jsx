'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useSearchParams, usePathname } from 'next/navigation'
import SectorButton from './sub/SectorButton'
import GeographySelector from './sub/GeographySelector'
import { useStore } from '@/store/store'

export default function SectorSelector() {
	const [openGeographies, setOpenGeographies] = useState(false)
	const [missingGeographies, setMissingGeographies] = useState('')

	const selectedSector = useStore((state) => state.sector)
	const changeSector = useStore((state) => state.changeSector)
	const geographies = useStore((state) => state.geographies)
	const addGeography = useStore((state) => state.addGeography)
	const removeGeography = useStore((state) => state.removeGeography)

	const urlParams = useSearchParams()
	const sectorParam = urlParams.get('s')

	const geoRef = useRef()
	const locale = useLocale()
	const router = useRouter()
	const pathname = usePathname()

	const handleClick = (sector) => {
		if (sector == selectedSector) {
			console.log('same sector')
			changeSector('')
			setOpenGeographies(false)
			return
		} else {
			console.log('different sector')
			changeSector(sector)
			setOpenGeographies(true)
			setTimeout(() => {
				geoRef.current?.scrollIntoView({ behavior: 'smooth' })
			}, 100)
		}
	}

	const handleContinue = () => {
		if (geographies.length > 0 && selectedSector.length > 0) {
			const geographiesToString = geographies
				.map((geo) => geo.value)
				.join('_')
			router.push(
				`/${locale}/selection?s=${selectedSector}&geo=${geographiesToString}`
			)
		} else if (geographies.length === 0) {
			setMissingGeographies('Please select at least one geography')
		} else if (!selectedSector) {
			setMissingGeographies(
				'Something went wrong. Please refresh the page and try again.'
			)
		}
	}

	const handleGeographies = (geography) => {
		if (geographies.includes(geography)) {
			removeGeography(geography)
		} else {
			addGeography(geography)
		}
		console.log('geographies', geographies)
	}

	useEffect(() => {
		if (!selectedSector) {
			if (sectorParam) {
				changeSector(sectorParam)
				setOpenGeographies(true)
			} else {
				setOpenGeographies(false)
			}
		} else {
			setOpenGeographies(true)
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
			<div ref={geoRef}>
				{openGeographies && (
					<GeographySelector
						missingGeographies={missingGeographies}
						/* geographies={geographies} */
						handleContinue={handleContinue}
						handleGeographies={handleGeographies}
					/>
				)}
			</div>
		</div>
	)
}
