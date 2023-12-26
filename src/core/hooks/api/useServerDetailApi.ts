import { useQuery } from "@tanstack/react-query";

import { getServerDetailService } from "@/services/server.service";

export default function useServerDetailApi(server_id: string, timer: number) {
    const { isLoading, data: server, isError, refetch } = useQuery({ 
        queryKey: ['servers', server_id],
        // staleTime: Infinity,
        queryFn:()=> getServerDetailService(server_id),
        enabled: !!server_id,
        refetchInterval: timer ? timer : Infinity
    })

    return {
        isLoading,
        server,
        isError
    }
}