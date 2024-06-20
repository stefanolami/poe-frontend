'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

export default function GeographyModifier() {
	const [isOpen, setIsOpen] = useState(false)
	const [geographies, setGeographies] = useState([])
	const [missingGeographies, setMissingGeographies] = useState('')
	const items = [
		{ value: 'eu-admin', label: 'EU Administrated' },
		{ value: 'eu-27', label: 'EU-27, Island, Norway, UK, Switzerland ' },
		{ value: 'brazil', label: 'Brazil' },
		{ value: 'turkey', label: 'Turkey ' },
		{ value: 'colombia', label: 'Colombia ' },
		{ value: 'russia', label: 'Russia ' },
	]

	const router = useRouter()
	const locale = useLocale()
	const urlParams = useSearchParams()
	const geoParams = urlParams.get('geo')
	const sectorParam = urlParams.get('s')
	const upArrow = '/up-arrow.png'
	const downArrow = '/down-arrow.png'

	const handleCheckboxChange = (event) => {
		const { value, checked } = event.target
		setGeographies((prevGeographies) =>
			checked
				? [...prevGeographies, value]
				: prevGeographies.filter((item) => item !== value)
		)
	}

	const handleCLick = async () => {
		if (geographies.length > 0) {
			router.push(
				`/${locale}/selection?s=${sectorParam}&geo=${geographies.join(
					'_'
				)}`
			)
			setIsOpen(false)
		} else if (geographies.length === 0) {
			setMissingGeographies('Please select at least one geography')
		} else if (!sectorParam) {
			setMissingGeographies(
				'Something went wrong. Please refresh the page and try again.'
			)
		}
	}

	const openMenu = () => {
		setIsOpen(!isOpen)
	}

	useEffect(() => {
		if (geoParams) {
			setGeographies(geoParams.split('_'))
		}
	}, [locale, geoParams])

	return (
		<div
			id="geo-modifier"
			className="text-xs xl:text-2xl w-40 xl:w-96 bg-primary text-white mb-10"
		>
			<div
				className="flex w-full items-center justify-between px-2 h-9 xl:h-20 cursor-pointer"
				onClick={openMenu}
			>
				<span className="font-bold">Change Geographies</span>
				<Image
					src={isOpen ? upArrow : downArrow}
					alt="arrow"
					width={20}
					height={20}
					className="scale-[0.7] -mr-1"
				/>
			</div>
			{isOpen && (
				<div className="w-full px-3 py-3">
					<ul className="flex flex-col items-center justify-center gap-3 xl:gap-4 mx-auto">
						{items.map((item, index) => (
							<li
								key={index}
								className="flex flex-row items-center gap-2 xl:gap-3 w-full"
							>
								<input
									type="checkbox"
									id={`checkbox-${index}`}
									value={item.value} // Use a unique value for each item
									checked={geographies.includes(item.value)} // Set checked state
									onChange={handleCheckboxChange}
									className="custom-checkbox"
								/>
								<label htmlFor={`checkbox-${index}`}>
									{item.label}
								</label>
							</li>
						))}
					</ul>
					<p className="text-center text-red-500 py-4">
						{missingGeographies}
					</p>
					<button
						onClick={handleCLick}
						className="block mx-auto px-4 py-1 text-primary font-bold bg-white hover:brightness-95 shadow-md hover:shadow-xl"
					>
						Apply
					</button>
				</div>
			)}
		</div>
	)
}
