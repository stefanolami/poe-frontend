import { produce } from 'immer'
import { create } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import selectionData from '../data/selectionData'

export const useStore = create(
	persist(
		devtools((set, get) => ({
			sector: {},
			geographies: [],
			languages: [],
			data: {
				eMobility: {
					typeOfVehicle: [],
					typeOfVehicleContract: [],
					eVehiclesMaintenance: [],
					chargingStations: [],
					chargingStationsMaintenance: [],
				},
			},
			changeSector: (newSector) =>
				set((state) => ({ sector: newSector })),
			addGeography: (newGeography) => {
				set((state) => ({
					geographies: [...state.geographies, newGeography],
				}))
				Object.keys(get().data.eMobility).forEach((category) => {
					if (
						category !== 'typeOfVehicleContract' &&
						category !== 'chargingStationsMaintenance'
					) {
						get().data.eMobility[category].forEach((item) => {
							get().removeData(category, item)
							get().addData(category, item)
						})
					}
				})
			},
			removeGeography: (geographyToRemove) => {
				set((state) => ({
					geographies: state.geographies.filter(
						(geography) =>
							geography.value !== geographyToRemove.value
					),
				}))
				Object.keys(get().data.eMobility).forEach((category) => {
					if (
						category !== 'typeOfVehicleContract' &&
						category !== 'chargingStationsMaintenance'
					) {
						get().data.eMobility[category].forEach((item) => {
							get().removeData(category, item)
							get().addData(category, item)
						})
					}
				})
			},
			addSingleGeography: (geography, category, item) => {
				set(
					produce((state) => {
						state.data.eMobility[category]
							.find((element) => element.value === item.value)
							.geographies.push(geography)
					})
				)
			},
			removeSingleGeography: (geographyToRemove, category, item) => {
				set(
					produce((state) => {
						state.data.eMobility[category].find(
							(element) => element.value === item.value
						).geographies = state.data.eMobility[category]
							.find((element) => element.value === item.value)
							.geographies.filter(
								(geo) => geo.value !== geographyToRemove.value
							)
					})
				)
			},
			addLanguage: (newLanguage) =>
				set((state) => ({
					languages: [...state.languages, newLanguage],
				})),
			removeLanguage: (languageToRemove) =>
				set((state) => ({
					languages: state.languages.filter(
						(language) => language.value !== languageToRemove.value
					),
				})),
			addData: (category, item) =>
				set(
					produce((state) => {
						if (
							category === 'typeOfVehicleContract' ||
							category === 'chargingStationsMaintenance'
						) {
							state.data.eMobility[category].push(item)
						} else {
							const newItem = {
								...item,
								geographies: state.geographies,
							}
							state.data.eMobility[category].push(newItem)
						}
					})
				),
			removeData: (category, itemToRemove) =>
				set(
					produce((state) => {
						const index = state.data.eMobility[category].findIndex(
							(item) => item.value == itemToRemove.value
						)
						if (index !== -1) {
							state.data.eMobility[category].splice(index, 1)
						}
					})
				),
			getSinglePrice: (category, item) => {
				let total = 0
				get().geographies.forEach((country) => {
					total += parseInt(
						selectionData[get().sector?.value][category]?.find(
							(x) => x.value === item.value
						).price[country.value]
					)
				})
				return total
			},
			getAllAbovePrice: (category) => {
				let total = 0
				selectionData[get().sector?.value][category]?.forEach(
					(item) => {
						total += get().getSinglePrice(category, item)
					}
				)
				return total
			},
			getSubTotal: () => {
				let total = 0
				Object.keys(get().data.eMobility).forEach((category) => {
					if (
						category !== 'typeOfVehicleContract' &&
						category !== 'chargingStationsMaintenance'
					) {
						get().data.eMobility[category].forEach((item) => {
							total += get().getSinglePrice(category, item)
						})
					}
				})
				return total
			},
			getTotalPrice: () => {
				let total = 0
				Object.keys(get().data.eMobility).forEach((category) => {
					if (
						category !== 'typeOfVehicleContract' &&
						category !== 'chargingStationsMaintenance'
					) {
						get().data.eMobility[category].forEach((item) => {
							total += get().getSinglePrice(category, item)
						})
					}
				})
				if (get().languages.length > 0) {
					const increment = get().languages.length * 0.25
					total *= 1 + increment
				}
				return total
			},
		})),
		{
			name: 'zustand-store',
			storage: createJSONStorage(() => sessionStorage),
		}
	)
)
