import createMiddleware from 'next-intl/middleware'
import { locales, localePrefix } from './navigation'

export default createMiddleware({
	// A list of all locales that are supported
	locales,

	// Used when no locale matches
	defaultLocale: 'ro',
	localePrefix,
})

export const config = {
	// Match only internationalized pathnames
	matcher: ['/', '/(ro|en)/:path*'],
}
