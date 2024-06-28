import { produce } from 'immer'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const useStore = create(
	persist(
		(set) => ({
			sector: '',
			geographies: [],
			data: {
				eMobility: [],
			},
			changeSector: (newSector) => set({ sector: newSector }),
			addGeography: (newGeography) =>
				set({ geographies: [...geographies, newGeography] }),
			removeGeography: (geographyToRemove) =>
				set({
					geographies: geographies.filter(
						(geography) => geography !== geographyToRemove
					),
				}),
			addData: (category, item) =>
				set(
					produce((state) => {
						state.data[category].push(item)
					})
				),
		}),
		{
			name: 'zustand-store',
		}
	)
)
