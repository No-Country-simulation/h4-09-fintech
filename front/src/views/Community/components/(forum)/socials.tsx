export interface ISocial {
	id: number
	name: string
	avatarUrl: string
}

export const socials: ISocial[] = [
	{
		id: 1,
		name: 'Facebook',
		avatarUrl: '/socials-icons/social1.png'
	},
	{
		id: 2,
		name: 'Instagram',
		avatarUrl: '/socials-icons/social2.jpeg'
	},
	{
		id: 3,
		name: 'Whatsapp',
		avatarUrl: '/socials-icons/social3.png'
	}
]