export function generateUrlWithParms<T extends Record<string, any>>( url: string, params?: T ){

  if (params) {
    const query = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    return `${url}?${query}`;
  }
  return url;
}