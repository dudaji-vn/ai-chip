import { useQuery } from "@tanstack/react-query";

import { getClustersService } from "@/services/cluster.service";

export default function useClusterApi(user_id: string, timer?: number) {
    const { isLoading, data: cluster, isError } = useQuery({ 
        queryKey: ['cluster', user_id],
        // staleTime: timer ? 0 : Infinity,
        queryFn:()=> getClustersService(user_id),
        refetchInterval: timer ? timer : Infinity
    })

    return {
        isLoading,
        cluster,
        isError
    }
}