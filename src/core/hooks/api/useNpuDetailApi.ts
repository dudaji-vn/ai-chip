import { useQuery } from "@tanstack/react-query";

import { getNpuDetailService } from "@/services/npu.service";

export default function useNpuDetailApi(npu_id: string) {
    const { isLoading, data: npu, isError } = useQuery({ 
        queryKey: ['npus', npu_id],
        staleTime: Infinity,
        queryFn:()=> getNpuDetailService(npu_id),
        enabled: !!npu_id
    })

    return {
        isLoading,
        npu,
        isError
    }
}