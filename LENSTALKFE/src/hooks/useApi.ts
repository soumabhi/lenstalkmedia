import { useState, useEffect, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function useApi<T>(endpoint: string, options: { 
  publicOnly?: boolean, 
  page?: number, 
  limit?: number, 
  search?: string,
  status?: string,
  sort?: string,
  autoFetch?: boolean
} = {}) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1
  });

  const fetchToken = () => localStorage.getItem('lenstalk_admin_token') || '';

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (options.publicOnly) params.append('published', 'true');
      if (options.page) params.append('page', options.page.toString());
      if (options.limit) params.append('limit', options.limit.toString());
      if (options.search) params.append('search', options.search);
      if (options.status) params.append('status', options.status);
      if (options.sort) params.append('sort', options.sort);

      const query = params.toString() ? `?${params.toString()}` : '';
      const response = await fetch(`${API_URL}/${endpoint}${query}`, {
        headers: {
          'Authorization': `Bearer ${fetchToken()}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}`);
      }
      
      const result = await response.json();
      const mappedData = (result.data || []).map((item: any) => ({
        ...item,
        id: item.id || item._id
      }));
      setData(mappedData);
      setPagination({
        total: result.total || mappedData.length,
        page: result.page || 1,
        pages: result.pages || 1
      });
      setError(null);
    } catch (err) {
      console.error(`Error fetching ${endpoint}:`, err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [endpoint, options.publicOnly, options.page, options.limit, options.search, options.status, options.sort]);

  useEffect(() => {
    if (options.autoFetch !== false) {
      fetchData();
    }
  }, [fetchData, options.autoFetch]);

  const add = async (item: Omit<T, 'id'>) => {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${fetchToken()}`
      },
      body: JSON.stringify(item),
    });
    
    if (!response.ok) throw new Error(`Failed to add to ${endpoint}`);
    const result = await response.json();
    const newItem = { ...result.data, id: result.data.id || result.data._id };
    
    // Optimistic update
    setData(prev => [...prev, newItem]);
    return result;
  };

  const update = async (id: string, item: Partial<T>) => {
    const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${fetchToken()}`
      },
      body: JSON.stringify(item),
    });
    
    if (!response.ok) throw new Error(`Failed to update ${endpoint}`);
    const result = await response.json();
    const updatedItem = { ...result.data, id: result.data.id || result.data._id };
    
    // Optimistic update
    setData(prev => prev.map(d => (d as any).id === id ? updatedItem : d));
    return result;
  };

  const remove = async (id: string) => {
    const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${fetchToken()}`
      }
    });
    
    if (!response.ok) throw new Error(`Failed to delete from ${endpoint}`);
    
    // Optimistic update
    setData(prev => prev.filter(d => (d as any)._id !== id && (d as any).id !== id));
    return true;
  };

  return { data, loading, error, pagination, add, update, remove, refresh: fetchData };
}

export const uploadFile = async (file: File): Promise<string> => {
  const token = localStorage.getItem('lenstalk_admin_token') || '';
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('File upload failed');
  }

  const data = await response.json();
  return data.url;
};
