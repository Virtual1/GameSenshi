import {
	ICONS_COMMON_ID,
	ICON_COMMON_PATH,
	ICONS_COMMON_TOOLTIP,
} from './ImagesTooltip'

import {
	FIRESTORE_SELLER_SETTINGS_PROFILE_SERVICES_DOTA2,
	FIRESTORE_SELLER_SETTINGS_PROFILE_SERVICES_PUBG,
	FIRESTORE_SELLER_SETTINGS_PROFILE_SERVICES_LOL,
	FIRESTORE_SELLER_SETTINGS_PROFILE_SERVICES_APEX,
	FIRESTORE_SELLER_SETTINGS_PROFILE_SERVICES_FORTNITE,
} from '0_constants'
import { createGetOptions } from '1_utils'

const gameIconsPath = game => require(`0_assets/icons/games/${game}.ico`)

const options = [
	{
		[ICONS_COMMON_ID]: FIRESTORE_SELLER_SETTINGS_PROFILE_SERVICES_DOTA2,
		[ICON_COMMON_PATH]: require(`0_assets/icons/games/Dota2.png`),
		[ICONS_COMMON_TOOLTIP]: 'Dota 2',
	},
	{
		[ICONS_COMMON_ID]: FIRESTORE_SELLER_SETTINGS_PROFILE_SERVICES_PUBG,
		[ICON_COMMON_PATH]: gameIconsPath(
			FIRESTORE_SELLER_SETTINGS_PROFILE_SERVICES_PUBG
		),
		[ICONS_COMMON_TOOLTIP]: 'PUBG',
	},
	{
		[ICONS_COMMON_ID]: FIRESTORE_SELLER_SETTINGS_PROFILE_SERVICES_LOL,
		[ICON_COMMON_PATH]: gameIconsPath(
			FIRESTORE_SELLER_SETTINGS_PROFILE_SERVICES_LOL
		),
		[ICONS_COMMON_TOOLTIP]: 'LOL',
	},
	{
		[ICONS_COMMON_ID]: FIRESTORE_SELLER_SETTINGS_PROFILE_SERVICES_APEX,
		[ICON_COMMON_PATH]: gameIconsPath(
			FIRESTORE_SELLER_SETTINGS_PROFILE_SERVICES_APEX
		),
		[ICONS_COMMON_TOOLTIP]: 'Apex Legends',
	},
	{
		[ICONS_COMMON_ID]: FIRESTORE_SELLER_SETTINGS_PROFILE_SERVICES_FORTNITE,
		[ICON_COMMON_PATH]: gameIconsPath(
			FIRESTORE_SELLER_SETTINGS_PROFILE_SERVICES_FORTNITE
		),
		[ICONS_COMMON_TOOLTIP]: 'Fortnite',
	},
]

const getImagesTooltip = createGetOptions(options, ICONS_COMMON_ID)

export { getImagesTooltip }
