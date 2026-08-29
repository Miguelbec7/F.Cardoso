/**
 * Funções e tipos puros, sem acesso ao sistema de ficheiros — seguros para
 * importar em componentes de cliente (Hero, etc.). A leitura dos conteúdos
 * (fs/gray-matter) fica em lib/cars.ts, que só corre no servidor.
 */

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
  carroceria: BodyType;
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
  /** Caminhos para /public/uploads, geridos pelo backoffice (Decap CMS). Vazio = usa a ilustração placeholder. */
  fotos: string[];
  /** Caminho para /public/uploads de um vídeo do carro, opcional. */
  video?: string;
};

function daysAgo(dateStr: string) {
  return (Date.now() - new Date(dateStr).getTime()) / 86_400_000;
}

export function isCarNew(car: Car) {
  return car.estado !== "vendido" && (car.recemChegado || daysAgo(car.criadoEm) < 21);
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

export function whatsappLink(message: string, phone = "351900000000") {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function carInterestMessage(car: Car) {
  return `Olá, tenho interesse no ${car.marca} ${car.modelo} ${car.versao} (${car.ano}). Gostaria de saber se ainda está disponível.`;
}
