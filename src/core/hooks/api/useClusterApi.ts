import { useQuery } from "@tanstack/react-query";

import { getClustersService } from "@/services/cluster.service";

export default function useClusterApi(user_id: string) {
    const { isLoading, data: cluster, isError } = useQuery({ 
        queryKey: ['cluster', user_id],
        staleTime: Infinity,
        queryFn:()=> getClustersService(user_id),
    })

    return {
        isLoading,
        cluster,
        isError
    }
}