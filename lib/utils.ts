export function generateSlug(make: string, model: string): string {
    return `${make}-${model}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}