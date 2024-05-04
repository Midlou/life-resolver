export const MENU_ITEMS = [
	{ value: "home", label: "Página inicial", link: "/" },
	{ value: "transaction", label: "Transações", link: "/transactions" },
	{ value: "category", label: "Categorias", link: "/categories" },
	{ value: "users", label: "Usuários", link: "/users" },
];

export const TYPE_LIST = [
	{ name: 'Sistema', value: 'system' },
	{ name: 'Cliente', value: 'customer' }
];

export const TYPE_LIST_BY_VALUE = {
	system: { name: 'Sistema', value: 'system' },
	customer: { name: 'Cliente', value: 'customer' }
};

export const ORDER_STATUS_LIST = [
	{ name: 'Aprovado', value: 'approved', class: "bg-green-500" },
	{ name: 'Pendente', value: 'pending', class: "bg-orange-500" },
	{ name: 'Reprovado', value: 'reproved', class: "bg-red-500" },
	{ name: 'Em entrega', value: 'scheduled', class: "bg-yellow-500" },
	{ name: 'Finalizado', value: 'finished', class: "bg-gray-500" },
];

export const ORDER_STATUS_LIST_BY_VALUE = {
	approved: { name: 'Aprovado', value: 'approved', class: "bg-green-500" },
	pending: { name: 'Pendente', value: 'pending', class: "bg-orange-500" },
	reproved: { name: 'Reprovado', value: 'reproved', class: "bg-red-500" },
	scheduled: { name: 'Em entrega', value: 'scheduled', class: "bg-yellow-500" },
	finished: { name: 'Finalizado', value: 'finished', class: "bg-gray-500" },
};

export const CATALOG_ITEM_STATUS_LIST = [
	{ name: 'Disponível', value: 'available' },
	{ name: 'Indisponível', value: 'unavailable' },
];

export const CATALOG_ITEM_STATUS_LIST_BY_VALUE = {
	available: { name: 'Disponível', value: 'available' },
	unavailable: { name: 'Indisponível', value: 'unavailable' },
};

export const BRAZIL_FEDERATIVE_UNITS = [
	{ "name": "AC", "label": "Acre" },
	{ "name": "AL", "label": "Alagoas" },
	{ "name": "AM", "label": "Amazonas" },
	{ "name": "AP", "label": "Amapá" },
	{ "name": "BA", "label": "Bahia" },
	{ "name": "CE", "label": "Ceará" },
	{ "name": "DF", "label": "Distrito Federal" },
	{ "name": "ES", "label": "Espírito Santo" },
	{ "name": "GO", "label": "Goiás" },
	{ "name": "MA", "label": "Maranhão" },
	{ "name": "MG", "label": "Minas Gerais" },
	{ "name": "MS", "label": "Mato Grosso do Sul" },
	{ "name": "MT", "label": "Mato Grosso" },
	{ "name": "PA", "label": "Pará" },
	{ "name": "PB", "label": "Paraíba" },
	{ "name": "PE", "label": "Pernambuco" },
	{ "name": "PI", "label": "Piauí" },
	{ "name": "PR", "label": "Paraná" },
	{ "name": "RJ", "label": "Rio de Janeiro" },
	{ "name": "RN", "label": "Rio Grande do Norte" },
	{ "name": "RO", "label": "Rondônia" },
	{ "name": "RR", "label": "Roraima" },
	{ "name": "RS", "label": "Rio Grande do Sul" },
	{ "name": "SC", "label": "Santa Catarina" },
	{ "name": "SE", "label": "Sergipe" },
	{ "name": "SP", "label": "São Paulo" },
	{ "name": "TO", "label": "Tocantins" }
];

export const BRAZIL_FEDERATIVE_UNITS_BY_VALUE = {
	AC: { "name": "AC", "label": "Acre" },
	AL: { "name": "AL", "label": "Alagoas" },
	AM: { "name": "AM", "label": "Amazonas" },
	AP: { "name": "AP", "label": "Amapá" },
	BA: { "name": "BA", "label": "Bahia" },
	CE: { "name": "CE", "label": "Ceará" },
	DF: { "name": "DF", "label": "Distrito Federal" },
	ES: { "name": "ES", "label": "Espírito Santo" },
	GO: { "name": "GO", "label": "Goiás" },
	MA: { "name": "MA", "label": "Maranhão" },
	MG: { "name": "MG", "label": "Minas Gerais" },
	MS: { "name": "MS", "label": "Mato Grosso do Sul" },
	MT: { "name": "MT", "label": "Mato Grosso" },
	PA: { "name": "PA", "label": "Pará" },
	PB: { "name": "PB", "label": "Paraíba" },
	PE: { "name": "PE", "label": "Pernambuco" },
	PI: { "name": "PI", "label": "Piauí" },
	PR: { "name": "PR", "label": "Paraná" },
	RJ: { "name": "RJ", "label": "Rio de Janeiro" },
	RN: { "name": "RN", "label": "Rio Grande do Norte" },
	RO: { "name": "RO", "label": "Rondônia" },
	RR: { "name": "RR", "label": "Roraima" },
	RS: { "name": "RS", "label": "Rio Grande do Sul" },
	SC: { "name": "SC", "label": "Santa Catarina" },
	SE: { "name": "SE", "label": "Sergipe" },
	SP: { "name": "SP", "label": "São Paulo" },
	TO: { "name": "TO", "label": "Tocantins" }
}

