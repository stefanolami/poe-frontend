'use client'

import { useState, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { useSearchParams, useRouter } from 'next/navigation'
import GeographyModifier from './sub/GeographyModifier'
import PriceModal from './sub/PriceModal'
import selectionData from '../data/selectionData'
import { useStore } from '../store/store'

export default function EMobilitySelection() {
	const [languages, setLanguages] = useState([])

	const storeSector = useStore((state) => state.sector)
	const geographies = useStore((state) => state.geographies)
	const storeData = useStore((state) => state.data)
	const addData = useStore((state) => state.addData)
	const removeData = useStore((state) => state.removeData)

	const locale = useLocale()
	const router = useRouter()

	const handleCheckbox = (category, item) => {
		if (
			storeData[storeSector.value][category].find(
				(el) => el.value === item.value
			)
		) {
			removeData(category, item)
		} else {
			addData(storeSector.value, category, item)
		}
	}

	const handleLanguages = (e) => {
		setLanguages((prevLanguages) =>
			e.target.checked
				? [...prevLanguages, e.target.value]
				: prevLanguages.filter((item) => item !== e.target.value)
		)
	}

	/* useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (
				Object.keys(storeSector).length === 0 ||
				geographies.length === 0
			) {
				router.push(`/${locale}`)
			}
		}, 2000)

		return () => clearTimeout(timeoutId) // Cleanup function
		//eslint-disable-next-line
	}, [storeSector, geographies]) */

	return (
		<div className="mt-10 mb-20 text-primary text-xs">
			<div className="flex flex-col items-center mx-auto justify-center gap-2">
				<div className="mx-auto font-unna font-bold text-lg xl:text-4xl flex items-center justify-center bg-secondary overflow-hidden text-white w-40 xl:w-96 h-9 xl:h-20">
					{storeSector.label}
				</div>
				<GeographyModifier />
			</div>
			{/* FULL SECTION */}
			<div className="flex flex-col items-center justify-center gap-3 mx-auto w-[90%]">
				{/* FIRST SECTION */}
				<section
					className="w-full"
					id="tenders-section"
				>
					<div className="w-full px-5 py-2 mb-4 bg-primary text-white font-unna text-base">
						Public Procurement Opportunities (Tenders)
					</div>
					{/* EVEHICLES */}
					<div className="w-full">
						<div className="w-full px-5 py-2 bg-secondary text-white font-bold text-xs">
							E-Vehicles
						</div>
						<div className="px-5 py-2">
							<span className="mt-3 block text-primary font-bold text-xs">
								Type of Vehicle
							</span>
							<ul className="space-y-1 mt-3">
								{selectionData.eMobility.typeOfVehicle.map(
									(item, index) => (
										<li
											key={item.value}
											className="flex flex-row items-center justify-between text-primary text-xs"
										>
											<div className="flex flex-row items-center gap-1 justify-start">
												<input
													type="checkbox"
													id={`checkbox-vehicle-type-${index}`}
													value={item.value}
													onChange={(e) =>
														handleCheckbox(
															'typeOfVehicle',
															item
														)
													}
													checked={
														storeData[
															storeSector.value
														]?.typeOfVehicle?.find(
															(element) =>
																element.value ===
																item.value
														)
															? true
															: false
													}
													className="custom-checkbox scale-[.8] peer"
												/>
												<label
													htmlFor={`checkbox-vehicle-type-${index}`}
													className="peer-checked:font-bold"
												>
													{item.label}
												</label>
											</div>
											<span
												className={
													storeData[
														storeSector.value
													]?.typeOfVehicle?.find(
														(element) =>
															element.value ===
															item.value
													)
														? 'font-bold'
														: ''
												}
											>{`EUR ${item.price.euAdmin} / year`}</span>
										</li>
									)
								)}
								<li
									key="all-above"
									className="flex flex-row items-center justify-between text-primary text-xs"
								>
									<div className="flex flex-row items-center gap-1 justify-start">
										<input
											type="checkbox"
											id="checkbox-vehicle-type-all-above"
											value="all"
											/* onChange={(e) =>
													handleCheckbox(
														e,
														'typeOfVehicle'
													)
												}
												checked={data.typeOfVehicle.includes(
													vehicle.value
												)} */
											className="custom-checkbox scale-[.8] peer"
										/>
										<label
											className="peer-checked:font-bold"
											htmlFor="checkbox-vehicle-type-all-above"
										>
											All of the above
										</label>
									</div>
									<span>EUR 11,000 / year</span>
								</li>
							</ul>
						</div>
						{storeData[storeSector.value]?.typeOfVehicle?.length >
							0 && (
							<div className="px-5 py-2">
								<span className="text-primary font-bold text-xs">
									Type of Contract
								</span>
								<ul className="space-y-1 mt-3">
									{selectionData.eMobility.typeOfVehicleContract.map(
										(item, index) => (
											<li
												key={item.value}
												className="flex flex-row items-center justify-between text-primary text-xs"
											>
												<div className="flex flex-row items-center gap-1 justify-start">
													<input
														type="checkbox"
														id={`checkbox-vehicle-contract-${index}`}
														value={item.value}
														onChange={(e) =>
															handleCheckbox(
																'typeOfVehicleContract',
																item
															)
														}
														checked={
															storeData.eMobility?.typeOfVehicleContract?.find(
																(element) =>
																	element.value ===
																	item.value
															)
																? true
																: false
														}
														className="custom-checkbox scale-[.8] peer"
													/>
													<label
														className="peer-checked:font-bold"
														htmlFor={`checkbox-vehicle-contract-${index}`}
													>
														{item.label}
													</label>
												</div>
											</li>
										)
									)}
									<li
										key="all-above"
										className="flex flex-row items-center justify-between text-primary text-xs"
									>
										<div className="flex flex-row items-center gap-1 justify-start">
											<input
												type="checkbox"
												id={`checkbox-vehicle-contract-all-above`}
												value="all"
												/* onChange={(e) =>
														handleCheckbox(
															e,
															'typeOfVehicleContract'
														)
													}
													checked={data.typeOfVehicleContract.includes(
														contract.value
													)} */
												className="custom-checkbox scale-[.8]"
											/>
											<label htmlFor="checkbox-vehicle-contract-all-above">
												All of the above
											</label>
										</div>
									</li>
								</ul>
							</div>
						)}
					</div>
					<div className="w-full">
						<div className="w-full px-5 py-2 bg-secondary text-white font-bold text-xs">
							Charging Stations
						</div>
						<div className="px-5 py-2">
							<span className="mt-3 block text-primary font-bold text-xs">
								Purchase, Operations and/or Maintenance of
								stations
							</span>
							<ul className="space-y-1 mt-3">
								{selectionData.eMobility.chargingStations.map(
									(item, index) => (
										<li
											key={item.value}
											className="flex flex-row items-center justify-between text-primary text-xs"
										>
											<div className="flex flex-row items-center gap-1 justify-start">
												<input
													type="checkbox"
													id={`checkbox-charging-stations-${index}`}
													value={item.value}
													onChange={(e) =>
														handleCheckbox(
															'chargingStations',
															item
														)
													}
													checked={
														storeData[
															storeSector.value
														]?.chargingStations?.find(
															(element) =>
																element.value ===
																item.value
														)
															? true
															: false
													}
													className="custom-checkbox scale-[.8] peer"
												/>
												<label
													className="peer-checked:font-bold"
													htmlFor={`checkbox-charging-stations-${index}`}
												>
													{item.label}
												</label>
											</div>
											<span
												className={
													storeData[
														storeSector.value
													]?.chargingStations?.find(
														(element) =>
															element.value ===
															item.value
													)
														? 'font-bold'
														: ''
												}
											>{`EUR ${item.price.euAdmin} / year`}</span>
										</li>
									)
								)}
							</ul>
						</div>
						{storeData[storeSector.value]?.chargingStations
							?.length > 0 && (
							<div className="px-5 py-2">
								<span className="text-primary font-bold text-xs">
									Type of Maintenance
								</span>
								<ul className="space-y-1 mt-3">
									{selectionData.eMobility.chargingStationsMaintenance.map(
										(item, index) => (
											<li
												key={item.value}
												className="flex flex-row items-center justify-between text-primary text-xs"
											>
												<div className="flex flex-row items-center gap-1 justify-start">
													<input
														type="checkbox"
														id={`checkbox-charging-stations-maintenance-${index}`}
														value={item.value}
														onChange={(e) =>
															handleCheckbox(
																'chargingStationsMaintenance',
																item
															)
														}
														checked={
															storeData[
																storeSector
																	.value
															]?.chargingStationsMaintenance?.find(
																(element) =>
																	element.value ===
																	item.value
															)
																? true
																: false
														}
														className="custom-checkbox scale-[.8] peer"
													/>
													<label
														className="peer-checked:font-bold"
														htmlFor={`checkbox-charging-stations-maintenance-${index}`}
													>
														{item.label}
													</label>
												</div>
											</li>
										)
									)}
								</ul>
							</div>
						)}
					</div>
				</section>
				<section
					className="w-full"
					id="eu-report-section"
				>
					<div className="w-full px-5 py-2 bg-primary text-white font-unna text-base text-balance">
						European Commission Funding & Investment Financing
						opportunities in the e-mobility sector
					</div>
					<div className="mt-3 px-5 py-2 flex flex-row justify-between items-start gap-1">
						<div className="flex flex-row justify-start items-start gap-1">
							<input
								type="checkbox"
								id="checkbox-report-eu"
								value="report-eu"
								/* onChange={(e) => handleCheckbox(e, 'chargingStations')}
						checked={data.chargingStations.includes(item.value)} */
								className="custom-checkbox scale-[.8] peer"
							/>
							<label
								className="peer-checked:font-bold"
								htmlFor="checkbox-report-eu"
							>
								Quarterly report (with ad hoc alerts for
								time-sensitive announcements) on European
								Commission support programme for research &
								innovation & deployment investment of e-mobility
								services
							</label>
						</div>
						<span className="block text-nowrap">
							EUR 8,000 / year
						</span>
					</div>
				</section>
				<section
					className="w-full"
					id="non-eu-report-section"
				>
					<div className="w-full px-5 py-2 bg-primary text-white font-unna text-base text-balance">
						European Funding & Investment Financing opportunities in
						the e-mobility sector (non-EU administered)
					</div>

					<div className="mt-3 px-5 py-2 flex flex-row justify-between items-start gap-1">
						<div className="flex flex-row justify-start items-start gap-1">
							<input
								type="checkbox"
								id="checkbox-report-non-eu"
								value="report-non-eu"
								/* onChange={(e) => handleCheckbox(e, 'chargingStations')}
						checked={data.chargingStations.includes(item.value)} */
								className="custom-checkbox scale-[.8] peer"
							/>
							<label
								className="peer-checked:font-bold"
								htmlFor="checkbox-report-non-eu"
							>
								Quarterly report (with ad hoc alerts for
								time-sensitive announcements) on international,
								regional or national funding or financing
								programmes of e-mobility services
							</label>
						</div>
						<span className="block text-nowrap">
							EUR 11,000 / year
						</span>
					</div>
				</section>
				<section
					className="w-full"
					id="language-section"
				>
					<div className="w-full px-5 py-2 bg-primary text-white font-unna text-base text-balance">
						Language
					</div>
					<div className="mt-3 px-5 py-2">
						<span className="text-pretty block">
							All monitoring is furnished in English. The reports
							can be available in the following languages with an
							additional <strong>25 percent</strong> for each
							country, on top of the total costs:
						</span>
						<ul className="mt-3 space-y-1">
							{selectionData.language.map((item, index) => (
								<li
									key={item.value}
									className="flex flex-row items-center justify-between text-primary text-xs"
								>
									<div className="flex flex-row items-center gap-1 justify-start">
										<input
											type="checkbox"
											id={`checkbox-language-${index}`}
											value={item.value}
											onChange={(e) => handleLanguages(e)}
											checked={languages.includes(
												item.value
											)}
											className="custom-checkbox scale-[.8] peer"
										/>
										<label
											htmlFor={`checkbox-language-${index}`}
											className="peer-checked:font-bold"
										>
											{item.label}
										</label>
									</div>
								</li>
							))}
						</ul>
					</div>
				</section>
				<section
					className="w-full"
					id="private-training-section"
				>
					<div className="w-full px-5 py-2 bg-primary text-white font-unna text-base text-balance">
						Private Training
					</div>
					<div className="mt-3 px-5 py-2 flex flex-row justify-between items-start gap-1">
						<div className="flex flex-row justify-start items-start gap-1">
							<input
								type="checkbox"
								id="checkbox-report-eu"
								value="report-eu"
								/* onChange={(e) => handleCheckbox(e, 'chargingStations')}
								checked={data.chargingStations.includes(item.value)} */
								className="custom-checkbox scale-[.8] peer"
							/>
							<label
								className="peer-checked:font-bold"
								htmlFor="checkbox-report-eu"
							>
								2-hour private seminar with the local experts on
								all questions you have on the above.
								<span className="mt-4 block">
									Free of charge if the above purchase is
									above EUR 10,000 / year
								</span>
							</label>
						</div>
						<span className="block text-nowrap">
							EUR 500 / session
						</span>
					</div>
				</section>
			</div>
			{/* <PriceModal
				parentData={storeData}
				parentGeographies={geographies}
				languages={languages}
			/> */}
		</div>
	)
}
