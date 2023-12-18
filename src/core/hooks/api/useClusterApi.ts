import { getClusterService } from "@/services/cluster.service";
import { useQuery } from "@tanstack/react-query";

export default function useClusterApi(user_id?: string) {
    const { isLoading, data: cluster, isError } = useQuery({ 
        queryKey: ['cluster', user_id],
        staleTime: Infinity,
        queryFn:()=> getClusterService(user_id),
    })

    return {
        isLoading,
        cluster,
        isError
    }
}