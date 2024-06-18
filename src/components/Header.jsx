import Navbar from './Navbar'
import DesktopLocaleSwitcher from './sub/DesktopLocaleSwitcher'

export default function Header(messages) {
	const navTrans = messages?.messages?.Navigation
	return (
		<div className="bg-primary p-2 xl:py-3 px-4 mx-auto w-full flex justify-end">
			{/* <Navbar messages={navTrans} /> */}
			<DesktopLocaleSwitcher />
		</div>
	)
}
