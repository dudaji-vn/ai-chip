import { useQuery } from "@tanstack/react-query";

import { getNpusService } from "@/services/npu.service";

export default function useNpuApi(user_id: string) {
    const { isLoading, data: npus, isError } = useQuery({ 
        queryKey: ['npus', user_id],
        staleTime: Infinity,
        queryFn:()=> getNpusService(user_id),
        enabled: !!user_id
    })

    return {
        isLoading,
        npus,
        isError
    }
}