import { useState, useEffect } from 'react'
import Image from 'next/image'
import selectionData from '@/data/selectionData'
import { categoryValueToLabel } from '@/utils/helpers'

export default function PriceModal({
	parentData,
	parentGeographies,
	languages,
}) {
	const [data, setData] = useState()
	const [prices, setPrices] = useState([])
	const [geographies, setGeographies] = useState()
	const [isOpen, setIsOpen] = useState(false)
	const [isOpenCategory, setIsOpenCategory] = useState({
		general: false,
		eVehicles: {
			cars: false,
			buses: false,
			trucks: false,
			planes: false,
			boats: false,
			twoWheelers: false,
		},
		eVehiclesMaintenance: {
			evServices: false,
			diagnosis: false,
			exchangePurchase: false,
			cars: false,
			buses: false,
			trucks: false,
			planes: false,
			boats: false,
			twoWheelers: false,
		},
		chargingStations: {
			bikesCars: false,
			buses: false,
			trucks: false,
			planes: false,
			boats: false,
			twoWheelers: false,
		},
	})

	const upArrow = '/up-arrow.png'
	const downArrow = '/down-arrow.png'

	const toggleOpen = () => {
		setIsOpen(!isOpen)
	}

	const toggleOpenCategory = (category1, category2) => {
		setIsOpenCategory({
			...isOpenCategory,
			[category1]: {
				...isOpenCategory[category1],
				[category2]: !isOpenCategory[category1][category2],
			},
		})
	}

	const processPrice = (category) => {
		if (
			category == 'typeOfVehicle' ||
			category == 'eVehiclesMaintenance' ||
			category == 'chargingStations'
		) {
			let total = 0
			if (data[category].length > 0) {
				data[category].forEach((item) => {
					geographies.forEach((geo) => {
						total += parseInt(
							selectionData.eMobility[category].find(
								(x) => x.value === item.value
							).price[geo]
						)
					})
				})
				console.log('processed price ', category, total)
				return total
			}
			return null
		}
		return null
	}

	const getSinglePrice = (category, item) => {
		let total = 0
		const geo = data[category].find((x) => x.value === item.value).countries
		geo.forEach((country) => {
			total += parseInt(
				selectionData.eMobility[category].find(
					(x) => x.value === item.value
				).price[country]
			)
		})
		setPrices((prevPrices) => ({
			...prevPrices,
			[category]: [
				...prevPrices[category],
				{
					value: item.value,
					price: total,
				},
			],
		}))
		return prices[category]?.find((x) => x.value === item.value).price
	}

	const getSubTotal = () => {
		let total = 0
		for (const category in data) {
			total += processPrice(category)
		}
		return total
	}

	const getTotalPrice = () => {
		let total = 0
		for (const category in data) {
			total += processPrice(category)
		}
		if (languages.length > 0) {
			const increment = languages.length * 0.25
			total *= 1 + increment
		}
		return total
	}

	useEffect(() => {
		setData(parentData)
		setGeographies(parentGeographies)
	}, [parentGeographies, parentData, languages])
	console.log('languages children', languages)

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
			{isOpen ? (
				<>
					<div className="w-full text-xs">
						<div className="bg-white w-full h-[2px]"></div>
						{Object.keys(data).map((category) => {
							if (
								category == 'typeOfVehicle' ||
								category == 'eVehiclesMaintenance' ||
								category == 'chargingStations'
							) {
								if (data[category]?.length > 0) {
									return (
										<div key={category}>
											<div className="text-base font-bold pt-2 pb-1">
												{categoryValueToLabel(category)}
											</div>
											<div className="text-sm">
												{data[category].map((item) => {
													return (
														<div
															key={item.value}
															className="flex flex-row justify-between items-center"
														>
															<span>
																{item.value}
															</span>
															<span>
																EUR{' '}
																{getSinglePrice(
																	category,
																	item
																)}
															</span>
														</div>
													)
												})}
											</div>
										</div>
									)
								}
							}
						})}
					</div>

					{languages.length > 0 && (
						<div className="my-3">
							<div className="flex flex-col justify-center items-center text-base font-bold">
								<span className="flex flex-row justify-start w-full">
									SUBTOTAL
								</span>
								<div className="bg-white w-full h-[2px]"></div>
								<span className="flex flex-row justify-end w-full">
									EUR {getSubTotal()}
								</span>
							</div>
							<div>
								<span className="font-bold">Language</span>
							</div>
						</div>
					)}
					<div className="flex flex-col justify-center items-center text-base font-bold my-3">
						<span className="flex flex-row justify-start w-full">
							TOTAL
						</span>
						<div className="bg-white w-full h-[2px]"></div>
						<span className="flex flex-row justify-end w-full">
							EUR {getTotalPrice()}
						</span>
					</div>
				</>
			) : (
				<>
					<div className="bg-white w-full h-[2px]"></div>
					<div className="text-base font-bold flex flex-row justify-between items-center pt-2 pb-[10px]">
						<span>TOTAL</span>
						<span>EUR {getTotalPrice()}</span>
					</div>
				</>
			)}
		</div>
	)
}
