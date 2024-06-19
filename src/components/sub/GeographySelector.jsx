'use client'
import { useState } from 'react'
import { useMyContext } from '@/app/context-provider'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

export default function GeographySelector() {
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

	const { geographies, setGeographies, selectedSector } = useMyContext()

	const handleCheckboxChange = (event) => {
		const { value, checked } = event.target

		// Update checkedItems based on checkbox state
		setGeographies((prevGeographies) =>
			checked
				? [...prevGeographies, value]
				: prevGeographies.filter((item) => item !== value)
		)
	}

	const handleCLick = () => {
		if (geographies.length > 0 && selectedSector.value.length > 0) {
			router.push(`/${locale}/selection`)
		} else if (geographies.length === 0) {
			setMissingGeographies('Please select at least one geography')
		} else if (selectedSector.length === 0) {
			setMissingGeographies(
				'Something went wrong. Please refresh the page and try again.'
			)
		}
	}

	return (
		<div className="text-xs xl:text-2xl w-full">
			<p className="text-center mt-10 xl:mt-16">
				Please choose the geographies you are interested in:
			</p>
			<ul className="flex flex-col items-center justify-center gap-3 xl:gap-4 mx-auto mt-6 xl:mt-10">
				{items.map((item, index) => (
					<li
						key={index}
						className="flex flex-row items-center gap-2 xl:gap-3 w-[242px] xl:w-[470px]"
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
			<div className="my-2 xl:my-16">
				<p className="text-center text-red-500 h-10 mt-6 xl:mt-0 xl:my-4">
					{missingGeographies}
				</p>
				<button
					className="mx-auto font-unna font-bold text-base xl:text-4xl flex items-center justify-center bg-secondary hover:brightness-95 overflow-hidden text-white w-40 xl:w-96 h-9 xl:h-20"
					onClick={handleCLick}
				>
					Continue
				</button>
			</div>
		</div>
	)
}
