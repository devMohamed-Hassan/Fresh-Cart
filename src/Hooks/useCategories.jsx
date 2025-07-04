import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}
