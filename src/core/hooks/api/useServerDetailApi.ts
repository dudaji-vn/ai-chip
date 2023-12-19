import { getServerDetailService } from "@/services/server.service";
import { useQuery } from "@tanstack/react-query";

export default function useServerDetailApi(server_id: string) {
    const { isLoading, data: server, isError } = useQuery({ 
        queryKey: ['servers', server_id],
        staleTime: Infinity,
        queryFn:()=> getServerDetailService(server_id),
        enabled: !!server_id
    })

    return {
        isLoading,
        server,
        isError
    }
}