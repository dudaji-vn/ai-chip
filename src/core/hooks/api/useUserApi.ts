import { useQuery } from "@tanstack/react-query";

import { getUserService } from "@/services/user.service";

export default function useUserApi() {
    const { isLoading, data: users, isError } = useQuery({ 
        queryKey: ['users'],
        queryFn:()=> getUserService(),
    })

    return {
        isLoading,
        users,
        isError
    }
}