export function copy_value(item) {
	if (!item) return item;

	return JSON.parse(JSON.stringify(item));
}
