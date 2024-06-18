import SectorSelector from './SectorSelector'

export default function Hero() {
	return (
		<div>
			<h1 className="text-center text-primary font-unna font-bold text-[60px] md:text-[90px] xl:text-[128px] mt-6">
				POE
			</h1>
			<h2 className="text-center text-primary font-unna font-bold text-[20px] md:text-[32px] xl:text-5xl mt-2 xl:mt-0">
				Your (Public Opportunity Essentials)
			</h2>
			<p className="text-center text-primary text-xs md:text-base xl:text-2xl m-5 xl:mt-16 xl:mx-52 font-normal">
				POE is a dynamic, real-time alert system designed to connect
				stakeholders—businesses, NGOs, and individuals—with public
				funding, public financing, and public tender opportunities. POE
				serves as an essential tool for those looking to sell products
				or services locally, regionally, or globally, ensuring they
				never miss an opportunity to engage in publicly funded projects.
			</p>
			<SectorSelector />
		</div>
	)
}
