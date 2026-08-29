export type FuelType = "Gasolina" | "Diesel" | "Híbrido" | "Elétrico";
export type Transmission = "Manual" | "Automática";
export type BodyType = "Berlina" | "Break" | "SUV" | "Hatchback" | "Coupé" | "Comercial";
export type CarStatus = "disponivel" | "reservado" | "vendido";

export type Car = {
  slug: string;
  marca: string;
  modelo: string;
  versao: string;
  ano: number;
  km: number;
  combustivel: FuelType;
  caixa: Transmission;
  carroçaria: BodyType;
  cilindrada: string;
  potencia: number;
  cor: string;
  preco: number;
  precoAnterior?: number;
  estado: CarStatus;
  destaque: boolean;
  carroDaSemana: boolean;
  recemChegado: boolean;
  equipamento: string[];
  descricao: string;
  garantia: string;
  localizacao: string;
  criadoEm: string;
};

export const cars: Car[] = [
  {
    slug: "bmw-serie-3-320d-2023",
    marca: "BMW",
    modelo: "Série 3",
    versao: "320d Touring",
    ano: 2023,
    km: 42000,
    combustivel: "Diesel",
    caixa: "Automática",
    carroçaria: "Break",
    cilindrada: "1995 cc",
    potencia: 190,
    cor: "Cinzento Mineral",
    preco: 32900,
    estado: "disponivel",
    destaque: true,
    carroDaSemana: false,
    recemChegado: true,
    equipamento: ["Navegação", "Bancos em pele", "Câmara de estacionamento", "Faróis LED adaptativos"],
    descricao:
      "BMW Série 3 Touring em excelente estado, revisões em concessionário, um único proprietário. Ideal para quem procura conforto e baixo consumo sem abdicar do prazer de condução.",
    garantia: "12 meses de garantia mecânica",
    localizacao: "Porto",
    criadoEm: "2026-08-20",
  },
  {
    slug: "mercedes-benz-classe-a-a200-2022",
    marca: "Mercedes-Benz",
    modelo: "Classe A",
    versao: "A200",
    ano: 2022,
    km: 38500,
    combustivel: "Gasolina",
    caixa: "Automática",
    carroçaria: "Hatchback",
    cilindrada: "1332 cc",
    potencia: 163,
    cor: "Branco Polar",
    preco: 27450,
    precoAnterior: 28900,
    estado: "disponivel",
    destaque: true,
    carroDaSemana: false,
    recemChegado: false,
    equipamento: ["MBUX", "Ambient light", "Sensores de estacionamento", "Apple CarPlay"],
    descricao:
      "Mercedes-Benz Classe A com pack AMG Line, interior premium e tecnologia de assistência à condução de última geração.",
    garantia: "12 meses de garantia mecânica",
    localizacao: "Braga",
    criadoEm: "2026-07-02",
  },
  {
    slug: "audi-q5-45-tdi-quattro-2021",
    marca: "Audi",
    modelo: "Q5",
    versao: "45 TDI Quattro S line",
    ano: 2021,
    km: 61200,
    combustivel: "Diesel",
    caixa: "Automática",
    carroçaria: "SUV",
    cilindrada: "1968 cc",
    potencia: 231,
    cor: "Preto Mítico",
    preco: 41900,
    estado: "disponivel",
    destaque: true,
    carroDaSemana: false,
    recemChegado: false,
    equipamento: ["Tração integral Quattro", "Teto panorâmico", "Bang & Olufsen", "Matrix LED"],
    descricao:
      "Audi Q5 com tração integral, acabamento S line e revisões sempre em dia. Viatura robusta, pronta para cidade e estrada.",
    garantia: "12 meses de garantia mecânica",
    localizacao: "Porto",
    criadoEm: "2026-05-14",
  },
  {
    slug: "volkswagen-golf-8-gtd-2023",
    marca: "Volkswagen",
    modelo: "Golf",
    versao: "8 GTD",
    ano: 2023,
    km: 18900,
    combustivel: "Diesel",
    caixa: "Manual",
    carroçaria: "Hatchback",
    cilindrada: "1968 cc",
    potencia: 200,
    cor: "Cinzento Indium",
    preco: 36500,
    estado: "disponivel",
    destaque: true,
    carroDaSemana: false,
    recemChegado: true,
    equipamento: ["Digital Cockpit Pro", "Suspensão DCC", "Bancos desportivos", "Travões vermelhos"],
    descricao:
      "Golf GTD praticamente novo, com muito baixa quilometragem e todo o equipamento desportivo de série.",
    garantia: "24 meses de garantia mecânica",
    localizacao: "Braga",
    criadoEm: "2026-08-10",
  },
  {
    slug: "porsche-macan-s-2022",
    marca: "Porsche",
    modelo: "Macan",
    versao: "S",
    ano: 2022,
    km: 29400,
    combustivel: "Gasolina",
    caixa: "Automática",
    carroçaria: "SUV",
    cilindrada: "2995 cc",
    potencia: 380,
    cor: "Azul Night Blue",
    preco: 54900,
    estado: "disponivel",
    destaque: false,
    carroDaSemana: true,
    recemChegado: false,
    equipamento: ["Chassis PASM", "Bancos desportivos Plus", "Sound Package Plus", "Air suspension"],
    descricao:
      "Porsche Macan S com primeiro proprietário, livro de revisões completo e um dos SUVs desportivos mais equilibrados do mercado.",
    garantia: "12 meses de garantia mecânica",
    localizacao: "Porto",
    criadoEm: "2026-06-01",
  },
  {
    slug: "bmw-serie-5-520d-2021",
    marca: "BMW",
    modelo: "Série 5",
    versao: "520d",
    ano: 2021,
    km: 71000,
    combustivel: "Diesel",
    caixa: "Automática",
    carroçaria: "Berlina",
    cilindrada: "1995 cc",
    potencia: 190,
    cor: "Preto Safira",
    preco: 34900,
    estado: "vendido",
    destaque: false,
    carroDaSemana: false,
    recemChegado: false,
    equipamento: ["Head-up display", "Bancos em pele", "Live cockpit professional"],
    descricao: "Vendido em agosto de 2026.",
    garantia: "12 meses de garantia mecânica",
    localizacao: "Porto",
    criadoEm: "2026-03-01",
  },
  {
    slug: "mercedes-benz-a180-2020",
    marca: "Mercedes-Benz",
    modelo: "Classe A",
    versao: "A180",
    ano: 2020,
    km: 54300,
    combustivel: "Gasolina",
    caixa: "Automática",
    carroçaria: "Hatchback",
    cilindrada: "1332 cc",
    potencia: 136,
    cor: "Cinzento Montanha",
    preco: 21900,
    estado: "vendido",
    destaque: false,
    carroDaSemana: false,
    recemChegado: false,
    equipamento: ["MBUX", "Faróis LED"],
    descricao: "Vendido em julho de 2026.",
    garantia: "12 meses de garantia mecânica",
    localizacao: "Braga",
    criadoEm: "2026-02-11",
  },
  {
    slug: "audi-a4-avant-2019",
    marca: "Audi",
    modelo: "A4",
    versao: "Avant 35 TDI",
    ano: 2019,
    km: 89000,
    combustivel: "Diesel",
    caixa: "Manual",
    carroçaria: "Break",
    cilindrada: "1968 cc",
    potencia: 150,
    cor: "Prateado Florete",
    preco: 22400,
    estado: "vendido",
    destaque: false,
    carroDaSemana: false,
    recemChegado: false,
    equipamento: ["Navegação", "Sensores de estacionamento"],
    descricao: "Vendido em junho de 2026.",
    garantia: "12 meses de garantia mecânica",
    localizacao: "Porto",
    criadoEm: "2026-01-20",
  },
  {
    slug: "porsche-macan-2020",
    marca: "Porsche",
    modelo: "Macan",
    versao: "2.0",
    ano: 2020,
    km: 64000,
    combustivel: "Gasolina",
    caixa: "Automática",
    carroçaria: "SUV",
    cilindrada: "1984 cc",
    potencia: 245,
    cor: "Branco Carrara",
    preco: 39900,
    estado: "vendido",
    destaque: false,
    carroDaSemana: false,
    recemChegado: false,
    equipamento: ["PASM", "Bancos elétricos"],
    descricao: "Vendido em maio de 2026.",
    garantia: "12 meses de garantia mecânica",
    localizacao: "Porto",
    criadoEm: "2025-12-05",
  },
];

export function getCarBySlug(slug: string) {
  return cars.find((c) => c.slug === slug);
}

export function getAvailableCars() {
  return cars.filter((c) => c.estado !== "vendido");
}

export function getSoldCars() {
  return cars.filter((c) => c.estado === "vendido");
}

export function getFeaturedCars() {
  return cars.filter((c) => c.destaque && c.estado !== "vendido");
}

export function getCarOfTheWeek() {
  return cars.find((c) => c.carroDaSemana);
}

export function getSimilarCars(car: Car, limit = 3) {
  return cars
    .filter(
      (c) =>
        c.slug !== car.slug &&
        c.estado !== "vendido" &&
        (c.marca === car.marca || c.carroçaria === car.carroçaria)
    )
    .slice(0, limit);
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatKm(value: number) {
  return `${new Intl.NumberFormat("pt-PT").format(value)} km`;
}

export function whatsappLink(message: string) {
  const phone = "351900000000";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function carInterestMessage(car: Car) {
  return `Olá, tenho interesse no ${car.marca} ${car.modelo} ${car.versao} (${car.ano}). Gostaria de saber se ainda está disponível.`;
}
