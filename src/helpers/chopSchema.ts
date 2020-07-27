const chopSchema = (url: string): string => url.replace(/^https?:\/\//, '');

export default chopSchema;
