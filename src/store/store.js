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
			addGeography: (newGeography) =>
				set((state) => ({
					geographies: [...state.geographies, newGeography],
				})),
			removeGeography: (geographyToRemove) =>
				set((state) => ({
					geographies: state.geographies.filter(
						(geography) =>
							geography.value !== geographyToRemove.value
					),
				})),
			addData: (sector, category, item) =>
				set(
					produce((state) => {
						state.data[sector][category].push(item)
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
		})),
		{
			name: 'zustand-store',
			storage: createJSONStorage(() => sessionStorage),
		}
	)
)
