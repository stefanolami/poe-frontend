'use client'
import { useState } from 'react'

export default function GeographySelector() {
	const [checkedItems, setCheckedItems] = useState([])
	const items = [
		{ value: 'eu-admin', label: 'EU Administrated' },
		{ value: 'eu-27', label: 'EU-27, Island, Norway, UK, Switzerland ' },
		{ value: 'brazil', label: 'Brazil' },
		{ value: 'turkey', label: 'Turkey ' },
		{ value: 'colombia', label: 'Colombia ' },
		{ value: 'russia', label: 'Russia ' },
	]
	const handleCheckboxChange = (event) => {
		const { value, checked } = event.target

		// Update checkedItems based on checkbox state
		setCheckedItems((prevCheckedItems) =>
			checked
				? [...prevCheckedItems, value]
				: prevCheckedItems.filter((item) => item !== value)
		)
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
						className="flex flex-row items-center gap-2 xl:gap-3 w-[242px] xl:w-[465px]"
					>
						<input
							type="checkbox"
							id={`checkbox-${index}`}
							value={item.value} // Use a unique value for each item
							checked={checkedItems.includes(item.value)} // Set checked state
							onChange={handleCheckboxChange}
							className="custom-checkbox"
						/>
						<label htmlFor={`checkbox-${index}`}>
							{item.label}
						</label>
					</li>
				))}
			</ul>
			<button className="mx-auto m-10 xl:m-20 font-unna font-bold text-base xl:text-4xl flex items-center justify-center bg-secondary hover:brightness-95 overflow-hidden text-white w-40 xl:w-96 h-9 xl:h-20">
				Continue
			</button>
		</div>
	)
}
