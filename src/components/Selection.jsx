'use client'

import { useState } from 'react'
import { useMyContext } from '@/app/context-provider'

export default function Selection() {
	const { geographies, selectedSector } = useMyContext()
	console.log(geographies)
	console.log(selectedSector)
	return (
		<div className="mt-16">
			<div className="">
				<div className="mx-auto font-unna font-bold text-base xl:text-4xl flex items-center justify-center bg-secondary overflow-hidden text-white w-40 xl:w-96 h-9 xl:h-20">
					{selectedSector.label}
				</div>
				<div className="mx-auto font-unna font-bold text-base xl:text-4xl flex items-center justify-center bg-primary overflow-hidden text-white w-40 xl:w-96 h-9 xl:h-20">
					{selectedSector.label}
				</div>
			</div>
		</div>
	)
}
