import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useBrands() {
     return useQuery({
          queryKey: ['brands'],
          queryFn: async () => {
               const res = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
               return res.data.data;
          },
          staleTime: 1000 * 60 * 5,
     });
}
