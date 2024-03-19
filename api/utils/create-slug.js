export const createSlug = (text) => {
  const slug = text.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
  return slug.replace(/-+$/, '');
}