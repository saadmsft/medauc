import { supabase } from '../lib/supabase.js';

/**
 * Get all products with optional filters
 */
export async function getProducts({ 
  category = null, 
  status = null, 
  minPrice = null, 
  maxPrice = null,
  brand = null,
  sortBy = 'created_at',
  sortOrder = 'desc',
  limit = 50,
  offset = 0 
} = {}) {
  let query = supabase
    .from('products')
    .select('*', { count: 'exact' });

  if (category) {
    query = query.eq('category_slug', category);
  }

  if (status && status !== 'All') {
    query = query.eq('status', status);
  }

  if (minPrice !== null) {
    query = query.gte('price', minPrice);
  }

  if (maxPrice !== null) {
    query = query.lte('price', maxPrice);
  }

  if (brand) {
    query = query.eq('brand', brand);
  }

  // Sorting
  const orderColumn = sortBy === 'newest' ? 'created_at' : sortBy === 'name' ? 'name' : 'price';
  const ascending = sortBy === 'name' || sortBy === 'price_asc';
  query = query.order(orderColumn, { ascending });

  // Pagination
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }

  return { products: data || [], total: count || 0 };
}

/**
 * Get a single product by ID
 */
export async function getProductById(id) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Not found
    }
    console.error('Error fetching product:', error);
    throw error;
  }

  return data;
}

/**
 * Get related products (same category, excluding current)
 */
export async function getRelatedProducts(productId, categorySlug, limit = 4) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_slug', categorySlug)
    .neq('id', productId)
    .limit(limit);

  if (error) {
    console.error('Error fetching related products:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get products by category slug
 */
export async function getProductsByCategory(categorySlug, limit = 50) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_slug', categorySlug)
    .limit(limit);

  if (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }

  return data || [];
}

/**
 * Map Supabase product format to component format
 */
export function mapProduct(p) {
  return {
    ...p,
    image: p.image_url,
    category: p.category_slug,
  };
}

/**
 * Search products by text
 */
export async function searchProducts(query, { limit = 50, offset = 0 } = {}) {
  if (!query || query.trim() === '') {
    return { products: [], total: 0 };
  }

  const searchTerm = query.trim().toLowerCase();

  // Use ilike for simple search (full-text search requires the search_vector column)
  const { data, error, count } = await supabase
    .from('products')
    .select('*', { count: 'exact' })
    .or(`name.ilike.%${searchTerm}%,brand.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,category_slug.ilike.%${searchTerm}%`)
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error searching products:', error);
    throw error;
  }

  return { products: data || [], total: count || 0 };
}

/**
 * Get featured/new products for homepage
 */
export async function getFeaturedProducts(limit = 8) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get products by IDs (for cart, etc.)
 */
export async function getProductsByIds(ids) {
  if (!ids || ids.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .in('id', ids);

  if (error) {
    console.error('Error fetching products by IDs:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get all categories
 */
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('id');

  if (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get category by slug
 */
export async function getCategoryBySlug(slug) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching category:', error);
    throw error;
  }

  return data;
}

/**
 * Get unique brands
 */
export async function getBrands() {
  const { data, error } = await supabase
    .from('products')
    .select('brand')
    .not('brand', 'is', null);

  if (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }

  // Extract unique brands
  const brands = [...new Set(data.map(p => p.brand))].filter(Boolean).sort();
  return brands;
}
