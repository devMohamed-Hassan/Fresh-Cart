import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useProducts() {
     return useQuery({
          queryKey: ['products'],
          queryFn: async () => {
               const res = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
               return res.data.data;
          },
          staleTime: 1000 * 60 * 5,
     });
}
