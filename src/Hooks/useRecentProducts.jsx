import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function useRecentProducts() {
     async function getRecentProducts() {
          const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
          return response.data;
     }

     const requestObject = useQuery({
          queryKey: ['recentProducts'],
          queryFn: getRecentProducts,
          refetchInterval: 80000,
          staleTime: 10000,
          select: (data) => data.data
     });

     return requestObject;
}

export default useRecentProducts;
