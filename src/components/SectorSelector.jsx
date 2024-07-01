'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import SectorButton from './sub/SectorButton'
import GeographySelector from './sub/GeographySelector'
import { useStore } from '@/store/store'

export default function SectorSelector() {
	const [openGeographies, setOpenGeographies] = useState(false)
	const [missingGeographies, setMissingGeographies] = useState('')
	const [activeSector, setActiveSector] = useState('')

	const storeSector = useStore((state) => state.sector)
	const changeSector = useStore((state) => state.changeSector)
	const geographies = useStore((state) => state.geographies)
	const addGeography = useStore((state) => state.addGeography)
	const removeGeography = useStore((state) => state.removeGeography)

	const geoRef = useRef()
	const locale = useLocale()
	const router = useRouter()

	const handleClick = (sector) => {
		if (sector == activeSector) {
			console.log('same sector')
			changeSector('')
			setActiveSector('')
			setOpenGeographies(false)
			return
		} else {
			console.log('different sector')
			changeSector(sector)
			setActiveSector(sector)
			setOpenGeographies(true)
			setTimeout(() => {
				geoRef.current?.scrollIntoView({ behavior: 'smooth' })
			}, 100)
		}
	}

	const handleContinue = () => {
		if (geographies.length > 0 && storeSector.length > 0) {
			router.push(`/${locale}/selection`)
		} else if (geographies.length === 0) {
			setMissingGeographies('Please select at least one geography')
		} else if (!storeSector) {
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

	/* useEffect(() => {
		if (!storeSector) {
			if (sectorParam) {
				changeSector(sectorParam)
				setOpenGeographies(true)
			} else {
				setOpenGeographies(false)
				console.log('opening geo', storeSector)
			}
		} else {
			setOpenGeographies(true)
		}
		//eslint-disable-next-line
	}, [locale, urlParams]) */

	return (
		<div>
			<div className="flex flex-col xl:flex-row items-center justify-center gap-4 xl:gap-12 mx-auto mt-10 xl:mt-12 3xl:mt-24">
				{activeSector !== 'Aviation' ? (
					<SectorButton
						text={'E-Mobility'}
						handler={() => handleClick('E-Mobility')}
						activeButton={activeSector}
					/>
				) : null}
				{activeSector !== 'E-Mobility' ? (
					<SectorButton
						text={'Aviation'}
						handler={() => handleClick('Aviation')}
						activeButton={activeSector}
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
