'use client'
import { createContext, useContext, useState } from 'react'

const Context = createContext()

export function ContextProvider({ children }) {
	const [geographies, setGeographies] = useState([])
	const [selectedSector, setSelectedSector] = useState('')

	return (
		<Context.Provider
			value={{
				geographies,
				setGeographies,
				selectedSector,
				setSelectedSector,
			}}
		>
			{children}
		</Context.Provider>
	)
}

export const useMyContext = () => useContext(Context)
