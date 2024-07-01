import { produce } from 'immer'
import { create } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const useStore = create(
	persist(
		devtools((set) => ({
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
		})),
		{
			name: 'zustand-store',
			storage: createJSONStorage(() => sessionStorage),
		}
	)
)
