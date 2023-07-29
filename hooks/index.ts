import { useState, useEffect } from 'react';

type DataFetcher<T> = () => Promise<T>;

export const useFetchData = <T>(getData: DataFetcher<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const requestData = async () => {
      try {
        setLoading(true);
        setError(null);

        const result: T = await getData();
        setData(result);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    requestData();
  }, [getData]);

  return { data, loading, error };
};
