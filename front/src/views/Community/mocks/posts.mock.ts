export interface IPost {
	id: number
	creationDate: string
	creationUser: string
	title: string
	subtitle: string
	text: string
	category: string
}

export const posts: IPost[] = [
	{
		id: 1,
		creationDate: new Date().toISOString(),
		creationUser: 'Juan',
		title: '¿Cómo empezar a invertir en bonos argentinos?',
		subtitle: 'Una guía rápida para principiantes',
		text: `Los bonos argentinos son una excelente opción para quienes buscan proteger sus ahorros y generar ingresos pasivos. Si bien pueden parecer complicados al principio, comprender lo básico es fundamental para tomar decisiones informadas. Una de las primeras cosas que debes hacer es investigar las diferentes opciones disponibles. Existen bonos en pesos, en dólares y ajustados por inflación, cada uno con sus propios riesgos y beneficios. Es importante también evaluar tu perfil de inversor y determinar cuánto estás dispuesto a arriesgar. No todos los bonos ofrecen el mismo nivel de seguridad, por lo que diversificar puede ser una estrategia efectiva. Finalmente, asegúrate de utilizar plataformas confiables para realizar tus inversiones. Contar con asesoramiento profesional puede marcar una gran diferencia, especialmente si recién estás comenzando.`,
		category: 'Inversores'
	},
	{
		id: 2,
		creationDate: new Date().toISOString(),
		creationUser: 'Carla',
		title: '¿Es buen momento para invertir en acciones del Merval?',
		subtitle: 'Perspectivas actuales del mercado',
		text: `El Merval ha mostrado una notable volatilidad en los últimos meses, lo que ha generado dudas entre los inversores sobre si es un buen momento para invertir. La incertidumbre económica en Argentina juega un papel importante en estas fluctuaciones. A pesar de los riesgos, muchas acciones del Merval están mostrando buenos rendimientos, especialmente aquellas vinculadas a sectores estratégicos como el energético y el financiero. Sin embargo, es crucial analizar las tendencias a largo plazo. Una estrategia común es optar por acciones con sólidos fundamentos y proyección de crecimiento. También puede ser útil diversificar tu portafolio, combinando acciones locales con otros instrumentos de inversión. No olvides que el mercado bursátil requiere paciencia y análisis constante. Mantente informado y consulta a expertos para maximizar tus resultados mientras minimizas riesgos.`,
		category: 'Inversores'
	},
	{
		id: 3,
		creationDate: new Date().toISOString(),
		creationUser: 'Luis',
		title: 'El impacto del dólar blue en nuestras inversiones',
		subtitle: 'Cómo manejar la incertidumbre cambiaria',
		text: `El dólar blue se ha convertido en un termómetro de la economía argentina, afectando tanto a consumidores como a inversores. Su constante fluctuación genera incertidumbre, pero también oportunidades. Para quienes buscan proteger su capital, una estrategia efectiva es diversificar las inversiones. No depender exclusivamente del dólar blue puede reducir riesgos en tu portafolio financiero. Otra opción es considerar inversiones ajustadas por inflación, como los bonos CER, que permiten mantener el poder adquisitivo en escenarios de alta volatilidad cambiaria. Finalmente, mantenerse informado sobre la evolución del mercado cambiario y las medidas económicas del gobierno puede ayudarte a tomar decisiones más acertadas y seguras.`,
		category: 'Inversores'
	},
	{
		id: 4,
		creationDate: new Date().toISOString(),
		creationUser: 'María',
		title: 'Plazo fijo vs. dólar: ¿Qué conviene más ahora?',
		subtitle: 'Análisis de rentabilidad y riesgo',
		text: `Elegir entre un plazo fijo y comprar dólares es una de las decisiones más comunes entre los argentinos. Ambos tienen sus ventajas y desventajas dependiendo del contexto económico. En términos de seguridad, los plazos fijos ofrecen tasas de interés competitivas, pero su rentabilidad puede verse afectada si la inflación supera lo esperado. Por otro lado, el dólar es una reserva de valor más estable. Es importante evaluar tu horizonte de inversión. Si buscas rendimientos a corto plazo, el plazo fijo puede ser más conveniente. Sin embargo, para protegerte frente a posibles devaluaciones, el dólar sigue siendo una opción sólida. Sea cual sea tu elección, analizar las tasas y los riesgos involucrados te ayudará a tomar decisiones financieras más acertadas y a proteger tus ahorros.`,
		category: 'Inversores'
	},
	{
		id: 5,
		creationDate: new Date().toISOString(),
		creationUser: 'Federico',
		title: 'Introducción al análisis técnico en la Bolsa',
		subtitle: 'Herramientas básicas para principiantes',
		text: `El análisis técnico es una herramienta poderosa para quienes invierten en la Bolsa. Aunque puede parecer complejo al principio, aprender sus fundamentos es clave para interpretar los movimientos del mercado. Una de las principales ventajas del análisis técnico es que se basa en patrones históricos. Esto permite identificar tendencias y predecir posibles comportamientos futuros de los precios. Algunas de las herramientas más útiles para empezar incluyen gráficos de velas, medias móviles y niveles de soporte y resistencia. Estas herramientas son esenciales para tomar decisiones informadas. Dedica tiempo a practicar y a entender cómo funcionan los mercados. Con la práctica, el análisis técnico puede convertirse en un aliado invaluable para tus inversiones.`,
		category: 'Inversores'
	},
	{
		id: 6,
		creationDate: new Date().toISOString(),
		creationUser: 'Laura',
		title: '¿Qué son los CEDEARs y cómo invertir en ellos?',
		subtitle: 'Una opción para diversificar tus inversiones',
		text: `Los CEDEARs son certificados que permiten invertir en acciones extranjeras desde Argentina. Son una excelente alternativa para diversificar tu portafolio sin necesidad de abrir cuentas en el exterior. Estos instrumentos te ofrecen la posibilidad de participar en empresas globales como Apple, Amazon o Tesla, pero en pesos argentinos. Esto facilita el acceso a mercados internacionales. Una de las ventajas de los CEDEARs es que están ligados al tipo de cambio, lo que ayuda a proteger tu inversión frente a devaluaciones. Sin embargo, es importante considerar los costos asociados y el rendimiento esperado. Antes de invertir, investiga sobre las empresas que te interesen y utiliza plataformas confiables. Diversificar tus inversiones es clave para gestionar el riesgo de manera efectiva.`,
		category: 'Inversores'
	},

	{
		id: 7,
		creationDate: new Date().toISOString(),
		creationUser: 'Diego',
		title: 'Criptomonedas: ¿Siguen siendo una opción en 2025?',
		subtitle: 'El futuro de las inversiones digitales en Argentina',
		text: `Las criptomonedas han revolucionado el mundo de las finanzas, ofreciendo alternativas innovadoras a los métodos tradicionales de inversión. En Argentina, su popularidad ha crecido debido a la inestabilidad económica y las restricciones cambiarias.Invertir en criptomonedas requiere entender su volatilidad. El valor de activos como Bitcoin o Ethereum puede fluctuar drásticamente en cuestión de horas, lo que representa tanto una oportunidad como un riesgo significativo. Para mitigar riesgos, es crucial no invertir más de lo que estás dispuesto a perder. Además, elegir exchanges confiables y proteger tus activos con billeteras digitales seguras son pasos fundamentales. El futuro de las criptomonedas es incierto pero prometedor. Con el avance de la tecnología blockchain y la adopción masiva en diferentes sectores, es probable que sigan siendo una opción interesante para los inversores.`,
		category: 'Cripto'
	},
	{
		id: 8,
		creationDate: new Date().toISOString(),
		creationUser: 'Ana',
		title: 'El impacto de la inflación en los ahorros argentinos',
		subtitle: 'Estrategias para proteger el valor de tu dinero',
		text: `La inflación es uno de los mayores desafíos para los ahorristas argentinos. A medida que los precios suben, el poder adquisitivo de nuestro dinero disminuye, lo que obliga a buscar alternativas para protegerlo. Una de las estrategias más comunes es invertir en instrumentos ajustados por inflación, como los bonos CER. Estos bonos ajustan su valor según el índice de precios, ayudando a mantener el poder adquisitivo. Otra opción es diversificar tus inversiones en activos que históricamente han superado a la inflación, como el dólar, las propiedades o incluso algunos tipos de acciones locales. La clave está en no dejar el dinero estancado y en mantenerse informado sobre las mejores opciones disponibles. Consultar con un asesor financiero puede ayudarte a tomar decisiones más seguras en este contexto.`,
		category: 'Inversores'
	},
	{
		id: 9,
		creationDate: new Date().toISOString(),
		creationUser: 'Gabriela',
		title: 'Cómo elegir un bróker para invertir en la Bolsa',
		subtitle: 'Factores clave a tener en cuenta',
		text: `Elegir un bróker es una de las decisiones más importantes para comenzar a invertir en la Bolsa. La plataforma que elijas impactará directamente en tu experiencia y en los costos asociados. Uno de los principales factores a considerar son las comisiones. Algunos brókers cobran tarifas por operación o mantenimiento, mientras que otros ofrecen servicios más económicos o incluso gratuitos. También es esencial evaluar la interfaz y las herramientas que el bróker proporciona. Una plataforma intuitiva, con acceso a gráficos y análisis, facilita la toma de decisiones informadas. Por último, asegúrate de que el bróker esté regulado y cuente con buenas opiniones de otros usuarios. Un bróker confiable será un aliado clave en tu camino como inversor.`,
		category: 'Inversores'
	},
	{
		id: 10,
		creationDate: new Date().toISOString(),
		creationUser: 'Martín',
		title: 'Fondos comunes de inversión: ¿Son para mí?',
		subtitle: 'Ventajas y desventajas de esta opción',
		text: `Los fondos comunes de inversión (FCI) son una opción accesible y diversificada para quienes desean invertir sin gestionar directamente una cartera. Son manejados por profesionales que distribuyen el capital en diferentes activos. Una de sus principales ventajas es la diversificación. Al invertir en un fondo, tu dinero se distribuye en varios instrumentos, reduciendo el riesgo asociado a una sola inversión. Sin embargo, los FCI también tienen costos asociados, como las comisiones de administración. Es importante evaluar si los rendimientos compensan estos gastos y se alinean con tus objetivos financieros. Antes de invertir en un FCI, analiza su historial de rendimiento, los activos en los que invierte y el nivel de riesgo. Así podrás decidir si esta opción es adecuada para tu perfil como inversor.`,
		category: 'Inversores'
	}
]

export interface Role {
	roleId: string
	roleName: string
}

export interface Authority {
	authority: string
}

export interface UserEntity {
	userId?: string
	username?: string
	name?: string
	lastName?: string
	password?: string | null
	onboardingComplete?: boolean
	mainGoal?: string | null
	financialKnowledge?: string | null
	riskPreference?: string | null
	funds?: number
	goals?: string[] // Cambiar "any" si tienes un tipo específico para las metas
	notifications?: string[] // Cambiar "any" si tienes un tipo específico para las notificaciones
	roles?: Role[]
	authorities?: Authority[]
	enabled?: boolean
	accountNonExpired?: boolean
	accountNonLocked?: boolean
	credentialsNonExpired?: boolean
}

export interface ExampleObject {
	id: number
	userEntity: UserEntity
	title: string
	subtitle: string
	text: string
	creationUser: string // ISO 8601 Date string
	creationDate: string // ISO 8601 Date string
	category: string
}

