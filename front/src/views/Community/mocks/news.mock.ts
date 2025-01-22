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

interface Ipublisher {
	favicon_url: string
	homepage_url: string
	logo_url: string
	name: string
}
interface Iinsight {
	sentiment: string
	sentiment_reasoning: string
	ticker: string
}

export interface IApiArticle {
	article_url: string
	author: string
	description: string
	id: string
	image_url: string
	insights: Iinsight[]
	keywords: string[]
	published_utc: string
	publisher: Ipublisher
	tickers: string[]
	title: string
}

export const Api_articles: IApiArticle[] = [
	{
		article_url:
			'https://www.globenewswire.com/news-release/2025/01/22/3013435/0/en/IMMvention-Therapeutix-Enters-Strategic-Collaboration-with-Novo-Nordisk-to-Develop-Oral-Therapies-for-Sickle-Cell-Disease-and-Other-Chronic-Diseases.html',
		author: 'N/A',
		description:
			"IMMvention Therapeutix, an early-stage biotech company, has entered a strategic collaboration with Novo Nordisk to co-develop oral therapies for sickle cell disease and other chronic conditions using IMMvention's BACH1 inhibitors.",
		id: 'ece11fbcf8f77b329dd3449b4ffc096890923383d1ff323580430cfa74b7b78c',
		image_url: 'https://ml.globenewswire.com/Resource/Download/d5a4a87d-24ed-4bf6-b45a-23d1a79d91c7',
		insights: [
			{
				sentiment: 'positive',
				sentiment_reasoning:
					"Novo Nordisk's partnership with IMMvention to advance the development of BACH1 inhibitors for sickle cell disease and other diseases is seen as a positive move, leveraging the company's expertise and resources.",
				ticker: 'NVO'
			}
		],
		keywords: ['sickle cell disease', 'oral therapies', 'BACH1 inhibitors', 'chronic diseases'],
		published_utc: '2025-01-22T13:00:00Z',
		publisher: {
			favicon_url: 'https://s3.polygon.io/public/assets/news/favicons/globenewswire.ico',
			homepage_url: 'https://www.globenewswire.com',
			logo_url: 'https://s3.polygon.io/public/assets/news/logos/globenewswire.svg',
			name: 'GlobeNewswire Inc.'
		},
		tickers: ['NVO'],
		title: 'IMMvention Therapeutix Enters Strategic Collaboration with Novo Nordisk to Develop Oral Therapies for Sickle Cell Disease and Other Chronic Diseases'
	}
]
