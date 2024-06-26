import { useState, useEffect } from 'react'
import Image from 'next/image'
import selectionData from '@/data/selectionData'

export default function PriceModal({ data, geographies }) {
	const [isOpen, setIsOpen] = useState(false)
	const [newGeo, setNewGeo] = useState()

	const upArrow = '/up-arrow.png'
	const downArrow = '/down-arrow.png'

	const toggleOpen = () => {
		setIsOpen(!isOpen)
	}
	const processPrice = (total, category) => {
		if (data[category].length > 0) {
			data[category].forEach((item) => {
				newGeo.forEach((geo) => {
					total += parseInt(
						selectionData.eMobility[category].find(
							(x) => x.value === item
						).price[geo]
					)
				})
			})
			return total
		}
		return null
	}

	const getTotalPrice = () => {
		let total = 0
		for (const category in data) {
			total += processPrice(total, category)
		}
		return total
	}

	useEffect(() => {
		setNewGeo(geographies)
	}, [geographies])

	return (
		<div
			className={`fixed bottom-0 left-0 right-0 bg-secondary px-5 text-white transition-all duration-300 ${
				isOpen ? 'h-dvh' : 'h-[82px]'
			}`}
			onClick={toggleOpen}
		>
			<div className="mx-auto flex flex-row justify-center items-center gap-4 pb-2 pt-[10px]">
				<span className="text-base font-bold">Order Summary</span>
				<Image
					src={isOpen ? downArrow : upArrow}
					alt="arrow"
					width={20}
					height={20}
					className="scale-90"
				/>
			</div>
			{isOpen ? <div className="h-64">{geographies}</div> : null}
			<div className="bg-white w-full h-[2px]"></div>
			<div className="text-base font-bold flex flex-row justify-between items-center pt-2 pb-[10px]">
				<span>TOTAL</span>
				<span>EUR {getTotalPrice()}</span>
			</div>
		</div>
	)
}
