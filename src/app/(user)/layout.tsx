import Header from "@/components/layouts/Header";

interface Props {
    children: React.ReactNode;
}

export default async function RootLayout({ children }: Props) {
    return (
        <>
            <Header></Header>
            <main className="mt-[84px]">
                {children}
            </main>
        </>
    );
}