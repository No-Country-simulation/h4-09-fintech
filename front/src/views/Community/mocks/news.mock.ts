export interface INew {
	id: number
	title: string
	subtitle: string
	description: string
	img: string
	avatar: string
	creationDate: string
	category: string
	source: string
}

export const news: INew[] = [
	{
		id: 1,
		title: 'La inflación global alcanza un nuevo record',
		subtitle: 'Perspectivas y medidas para combatirla',
		description:
			'La inflación a nivel mundial ha alcanzado máximos históricos, afectando a mercados clave. Los expertos analizan cómo los bancos centrales planean abordar esta situación con políticas monetarias más restrictivas.',
		img: '/comunity-imgs/news1.jpeg',
		avatar: '/comunity-imgs/avatar4.jpeg',
		creationDate: '20 de enero de 2025',
		category: 'Economía global',
		source: 'El Economista'
	},
	{
		id: 2,
		title: 'Nuevas oportunidades en bonos de renta fija',
		subtitle: 'Tasas de interés favorables impulsan la demanda',
		description:
			'Las recientes subidas de tasas han hecho que los bonos sean más atractivos para los inversionistas conservadores. Descubre cómo diversificar tu portafolio con opciones de bajo riesgo.',
		img: '/comunity-imgs/news2.jpeg',
		avatar: '/comunity-imgs/avatar5.jpeg',
		creationDate: '19 de enero de 2025',
		category: 'Inversiones',
		source: 'Infobae'
	}
]
