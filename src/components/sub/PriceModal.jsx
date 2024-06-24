import { useState } from 'react'
import Image from 'next/image'

export default function PriceModal() {
	const [isOpen, setIsOpen] = useState(false)

	const upArrow = '/up-arrow.png'
	const downArrow = '/down-arrow.png'

	const toggleOpen = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div
			className={`fixed bottom-0 left-0 right-0 bg-secondary px-5 text-white transition-all duration-300 ${
				isOpen ? 'h-dvh' : 'h-[82px]'
			}`}
			onClick={toggleOpen}
		>
			<div className="mx-auto flex flex-row justify-center items-center gap-4 py-2">
				<span className="text-base font-bold">Order Summary</span>
				<Image
					src={isOpen ? downArrow : upArrow}
					alt="arrow"
					width={20}
					height={20}
					className=""
				/>
			</div>
			{isOpen ? <div className="h-64"></div> : null}
			<div className="bg-white w-full h-[2px]"></div>
			<div className="text-base font-bold flex flex-row justify-between items-center py-2">
				<span>TOTAL</span>
				<span>EUR 16,500</span>
			</div>
		</div>
	)
}
