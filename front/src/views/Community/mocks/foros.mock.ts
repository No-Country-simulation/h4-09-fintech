export interface IForo {
	id: number
	title: string
	description: string
	img?: string
	avatar?: string
	ubication?: 'local' | 'global'
	type: 'open' | 'privated'
}

export const foros: IForo[] = [
	{
		id: 1,
		title: 'Inversores Globales',
		description: 'Comparte estrategias de inversión y oportunidades en mercados internacionales. Únete para aprender de otros inversores y descubrir nuevas tendencias financieras.',
		avatar: '/comunity-imgs/avatar1.jpeg',
		img: '/comunity-imgs/oro.jpeg',
		ubication: 'local',
		type: 'open'
	},
	{
		id: 2,
		title: 'Cripto y Blockchain',
		description: 'Explora las últimas tendencias, noticias y proyectos sobre criptomonedas y tecnología blockchain. Aprende y debate con entusiastas de este dinámico sector.',
		avatar: '/comunity-imgs/avatar3.jpeg',
		img: '/comunity-imgs/bitcoins.jpeg',
		ubication: 'global',
		type: 'privated'
	}
]
