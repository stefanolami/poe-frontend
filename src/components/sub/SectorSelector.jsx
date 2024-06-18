import SectorButton from './SectorButton'

export default function SectorSelector() {
	return (
		<div className="flex flex-col xl:flex-row items-center justify-center gap-4 xl:gap-12 mx-auto mt-10 xl:mt-12">
			<SectorButton text={'E-Mobility'} />
			<SectorButton text={'Aviation'} />
		</div>
	)
}
