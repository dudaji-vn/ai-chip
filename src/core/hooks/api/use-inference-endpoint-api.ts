import { useQuery } from "@tanstack/react-query";
import { getInferenceServices } from "@/services/inference.service";

export default function useInferenceApi(timer?: number) {
    const { isLoading, data: endpoints, isError } = useQuery({ 
        queryKey: ['lists', ],
        // staleTime: timer ? 0 : Infinity,
        queryFn:()=> getInferenceServices(),
        refetchInterval: timer ? timer : Infinity
    })

    return {
        isLoading,
        endpoints,
        isError
    }
}