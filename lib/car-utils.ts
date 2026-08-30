/**
 * Funções e tipos puros, sem acesso ao sistema de ficheiros — seguros para
 * importar em componentes de cliente (Hero, etc.). A leitura dos conteúdos
 * (fs/gray-matter) fica em lib/cars.ts, que só corre no servidor.
 */

export type FuelType = "Gasolina" | "Diesel" | "Híbrido" | "Elétrico";
export type Transmission = "Manual" | "Automática";
export type BodyType = "Berlina" | "Break" | "SUV" | "Hatchback" | "Coupé" | "Comercial" | "Monovolume";
export type CarStatus = "disponivel" | "reservado" | "vendido";

export type Equipamento = {
  geral?: string[];
  exterior?: string[];
  farois?: string[];
  retrovisores?: string[];
  vidros?: string[];
  bancos?: string[];
  volante?: string[];
  multimedia?: string[];
  seguranca?: string[];
  outros?: string[];
};

export const EQUIPAMENTO_LABELS: Record<keyof Equipamento, string> = {
  geral: "Informação Geral",
  exterior: "Exterior",
  farois: "Faróis",
  retrovisores: "Retrovisores",
  vidros: "Vidros",
  bancos: "Bancos",
  volante: "Volante",
  multimedia: "Conforto & Multimédia",
  seguranca: "Segurança & Desempenho",
  outros: "Outros",
};

export type Car = {
  slug: string;
  marca: string;
  modelo: string;
  versao: string;
  /** Em falta quando ainda não confirmado com o vendedor — nunca inventar um valor. */
  ano?: number;
  km?: number;
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
  equipamento: Equipamento;
  descricao: string;
  garantia: string;
  localizacao: string;
  criadoEm: string;
  /** Preenchido quando o estado passa a "vendido" — usado para ordenar "Recentemente vendidos". */
  vendidoEm?: string;
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
  const ano = car.ano ? ` (${car.ano})` : "";
  return `Olá, tenho interesse no ${car.marca} ${car.modelo} ${car.versao}${ano}. Gostaria de saber se ainda está disponível.`;
}
