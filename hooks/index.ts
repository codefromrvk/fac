import { useState, useEffect } from 'react';

type DataFetcher<T> = () => Promise<T>;

export const useFetchData = <T>(getData: DataFetcher<T>,initialValue?:T | null) => {
  
  const [data, setData] = useState<T | null>(initialValue??null);
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
        console.log({error});
        
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    requestData();
  }, [getData]);

  return { data, loading, error };
};
