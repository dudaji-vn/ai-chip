import { RootState } from "@/stores"
import { Router } from "next/router"
import { useSelector } from "react-redux"
export function GlobalLoading() {
    const isLoading = useSelector((state: RootState) => state.GlobalStore.isLoading)
    if (!isLoading) return null
    return (
        <div className="fixed inset-0 bg-gray-200/10 z-50 flex items-center justify-center">
            <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
        </div>
    )
}
