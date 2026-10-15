// Contenido del sitio. Los textos marcados como "fuente" vienen literalmente de la
// documentación de la fundación; lo marcado como PENDIENTE debe confirmarlo la fundación.

export const site = {
  name: "Fundación Aguapanela Viva",
  shortName: "Aguapanela Viva",
  url: "https://aguapanelaviva.org", // PENDIENTE: dominio comprado en Namecheap
  description:
    "Entidad sin ánimo de lucro que promueve la inclusión, la formación, la recreación y el acompañamiento integral de comunidades en Colombia.",
  // PENDIENTE: datos de contacto reales
  contact: {
    email: "contacto@aguapanelaviva.org",
    phone: "",
    whatsapp: "",
    city: "Colombia",
    instagram: "",
    facebook: "",
  },
};

export const nav = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/a-quien-acompanamos", label: "A quién acompañamos" },
  { href: "/programas", label: "Programas" },
  { href: "/involucrate", label: "Involúcrate" },
] as const;

// Fuente: Mision_Vision_Fundacion_Agua_Panela_viva.docx
export const mision =
  "La Fundación Aguapanela Viva es una entidad sin ánimo de lucro que promueve la inclusión, la formación, la recreación y el acompañamiento integral a hombres, mujeres y jóvenes líderes; niños con discapacidad; adultos mayores; víctimas del conflicto armado y del desplazamiento forzado. Trabajamos para restablecer derechos, fortalecer capacidades y generar oportunidades reales de participación social, económica y comunitaria mediante programas que se construyen desde el respeto, la dignidad y la corresponsabilidad con cada persona y comunidad que acompañamos.";

export const vision =
  "Para el año 2030, la Fundación Aguapanela Viva será reconocida a nivel regional, nacional e internacional como una entidad líder en procesos de inclusión social, articulando alianzas sostenibles con entidades públicas, privadas y de cooperación, y consolidando programas de alto impacto que transformen de manera duradera la calidad de vida de los hombres, mujeres y jóvenes líderes, los niños y niñas con discapacidad, los adultos mayores, y las víctimas de conflicto y desplazamiento a quienes acompaña.";

export const pilares = [
  {
    title: "Restablecer derechos",
    text: "Acompañamos a cada persona para que recupere lo que le corresponde y pueda ejercerlo con dignidad.",
  },
  {
    title: "Fortalecer capacidades",
    text: "Formación, recreación y acompañamiento integral para crecer en lo personal y en lo comunitario.",
  },
  {
    title: "Generar oportunidades",
    text: "Participación real en la vida social, económica y comunitaria de cada territorio.",
  },
] as const;

export const valores = [
  { title: "Respeto", text: "Partimos de la historia y la voz de cada persona y comunidad." },
  { title: "Dignidad", text: "Cada proceso reconoce el valor de quien acompañamos." },
  { title: "Corresponsabilidad", text: "Construimos los programas junto con las comunidades, no para ellas." },
] as const;

export type PoblacionId =
  | "lideres"
  | "ninez-discapacidad"
  | "adultos-mayores"
  | "victimas";

// Poblaciones según la misión. Las descripciones son un borrador para validar con la fundación.
export const poblaciones: {
  id: PoblacionId;
  title: string;
  short: string;
  text: string;
}[] = [
  {
    id: "lideres",
    title: "Hombres, mujeres y jóvenes líderes",
    short: "Liderazgo que transforma su entorno.",
    text: "Procesos de formación y acompañamiento para quienes impulsan cambios en sus familias y comunidades. Aquí nace Mujer de Influencia, nuestro programa de desarrollo integral de la mujer.",
  },
  {
    id: "ninez-discapacidad",
    title: "Niños y niñas con discapacidad",
    short: "Inclusión desde la infancia.",
    text: "Espacios de recreación, formación y acompañamiento para que niñas y niños con discapacidad participen plenamente, junto con sus familias.",
  },
  {
    id: "adultos-mayores",
    title: "Adultos mayores",
    short: "Una vida activa y acompañada.",
    text: "Recreación, encuentro y acompañamiento integral que reconocen la experiencia de las personas mayores y fortalecen sus redes de apoyo.",
  },
  {
    id: "victimas",
    title: "Víctimas del conflicto y del desplazamiento",
    short: "Restablecer derechos, reconstruir proyectos de vida.",
    text: "Acompañamiento a víctimas del conflicto armado y del desplazamiento forzado para restablecer derechos y generar oportunidades reales de participación social y económica.",
  },
];

// Fuente: MUJER DE INFLUENCIA.txt
export type ProgramaSlug = "raices" | "ancora" | "reina" | "visionarias";

export const mujerDeInfluencia = {
  title: "Mujer de Influencia",
  tagline: "Una transformación que comienza en ti y trasciende hacia los demás.",
  about:
    "Mujer de Influencia es un proyecto orientado al desarrollo integral de la mujer, que promueve la sanidad emocional, el fortalecimiento de la identidad, el empoderamiento, el liderazgo y el emprendimiento.",
  about2:
    "A través de cuatro programas, acompañamos a las mujeres en el reconocimiento de su historia, el descubrimiento de sus capacidades y la construcción de herramientas para transformar sus vidas e influir positivamente en sus familias, comunidades y entornos.",
  esencia: "Cuatro programas. Un mismo propósito: transformar vidas.",
  esencia2:
    "Cada programa responde a una dimensión del desarrollo de la mujer y contribuye a fortalecer sus recursos personales para desenvolverse en su entorno y generar un impacto positivo.",
  cierre: "Una mujer transformada puede transformar su entorno.",
};

export type PuntoIcon =
  | "leaf"
  | "heart"
  | "user"
  | "lotus"
  | "brain"
  | "shield"
  | "users"
  | "target"
  | "hands"
  | "bulb"
  | "chat"
  | "chart";

// Fuente: infografías oficiales de Mujer de Influencia
export const programas: {
  slug: ProgramaSlug;
  n: string;
  name: string;
  lema: string;
  esencia: string;
  description: string;
  trabajamos: string[];
  // Viñetas cortas de la infografía (imagen 1), cada una con su ícono
  puntos: { label: string; icon: PuntoIcon }[];
  frase: string;
  alianza?: string;
}[] = [
  {
    slug: "raices",
    n: "01",
    name: "Raíces",
    lema: "Sanar desde adentro para florecer hacia afuera.",
    esencia: "Sanamos nuestra historia.",
    description:
      "Un espacio de sanidad emocional y restauración personal que invita a las mujeres a comprender su historia, reconocer sus heridas y desarrollar herramientas para gestionar sus emociones y fortalecer su bienestar interior.",
    trabajamos: [
      "Sanidad y restauración emocional",
      "Reconocimiento de la historia personal",
      "Gestión emocional",
      "Bienestar interior",
    ],
    puntos: [
      { label: "Sanidad emocional", icon: "leaf" },
      { label: "Historia personal", icon: "leaf" },
      { label: "Gestión emocional", icon: "leaf" },
      { label: "Bienestar interior", icon: "leaf" },
    ],
    frase: "Volver a tu historia para comprenderte, sanar y florecer.",
  },
  {
    slug: "ancora",
    n: "02",
    name: "Áncora",
    lema: "Reconoce tu valor, fortalece tu esencia.",
    esencia: "Fortalecemos nuestra identidad.",
    description:
      "Un programa que potencia la sabiduría de la mujer y fortalece su inteligencia emocional, promoviendo una relación más consciente, saludable y segura consigo misma.",
    trabajamos: ["Autoestima", "Autoconcepto", "Autocuidado", "Inteligencia emocional"],
    puntos: [
      { label: "Autoestima", icon: "heart" },
      { label: "Autoconcepto", icon: "user" },
      { label: "Autocuidado", icon: "lotus" },
      { label: "Inteligencia emocional", icon: "brain" },
    ],
    frase:
      "Cuando reconoces tu valor, comienzas a relacionarte contigo misma de una manera diferente.",
  },
  {
    slug: "reina",
    n: "03",
    name: "Reina",
    lema: "Reconoce tu autoridad, lidera con propósito.",
    esencia: "Reconocemos nuestra capacidad de liderar.",
    description:
      "Un programa de empoderamiento femenino que fortalece la seguridad personal, desarrolla habilidades de liderazgo y ayuda a las mujeres a reconocer su capacidad de influir positivamente en otras personas y contribuir a su crecimiento.",
    trabajamos: [
      "Seguridad y confianza personal",
      "Empoderamiento y autoridad personal",
      "Liderazgo y rango de influencia",
      "Servicio, acompañamiento y desarrollo de otros",
    ],
    puntos: [
      { label: "Seguridad", icon: "shield" },
      { label: "Liderazgo", icon: "users" },
      { label: "Rango de influencia", icon: "target" },
      { label: "Servicio a otros", icon: "hands" },
    ],
    frase: "Una mujer que reconoce su valor puede liderar con seguridad e influir con propósito.",
  },
  {
    slug: "visionarias",
    n: "04",
    name: "Visionarias",
    lema: "Transforma tus ideas en oportunidades.",
    esencia: "Construimos oportunidades.",
    description:
      "Un programa de emprendimiento y desarrollo personal que impulsa a las mujeres a descubrir oportunidades, fortalecer sus capacidades y convertir sus ideas en proyectos con visión de crecimiento y sostenibilidad.",
    trabajamos: [
      "Emprendimiento y creación de oportunidades",
      "Comunicación asertiva",
      "Autosuperación y desarrollo personal",
      "Visión estratégica y liderazgo",
    ],
    puntos: [
      { label: "Emprendimiento", icon: "bulb" },
      { label: "Comunicación asertiva", icon: "chat" },
      { label: "Autosuperación", icon: "chart" },
      { label: "Visión y liderazgo", icon: "target" },
    ],
    frase:
      "No se trata solamente de soñar con un futuro diferente, sino de desarrollar las capacidades para construirlo.",
    alianza:
      "Articulación con el Fondo Emprender del SENA para acercar a las participantes a oportunidades de fortalecimiento y financiación de iniciativas emprendedoras, según los requisitos y las convocatorias vigentes.",
  },
];

export const getPrograma = (slug: string) => programas.find((p) => p.slug === slug);
