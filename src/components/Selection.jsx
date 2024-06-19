'use client'

import { useState } from 'react'
import { useMyContext } from '@/app/context-provider'

export default function Selection() {
	const { geographies, selectedSector } = useMyContext()
	return <div className="h-[2000px] bg-red-300"></div>
}
