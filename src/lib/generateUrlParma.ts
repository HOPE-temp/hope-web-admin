export function generateUrlWithParms<T extends Record<string, any>>(
  url: string,
  params?: T
) {
  if (params) {
    const query = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          // Si es array, crear un parámetro por cada elemento
          return value
            .filter(v => v !== undefined && v !== null)
            .map(v => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
            .join('&');
        } else {
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
      })
      .join('&');

    return `${url}?${query}`;
  }
  return url;
}
