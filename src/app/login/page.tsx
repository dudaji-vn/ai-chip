import Button from "@/components/shared/Button";
import Typography from "@/components/shared/Typography";

export default function LoginPage() {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="p-8 w-full max-w-[460px] text-center">
                <Typography tag='h1' size="4xl" className="mb-6">OurApp</Typography>
                <Typography tag='h2' size="2xl" className="mb-4">Introduction</Typography>
                <Typography size="xl" className="mb-6">Short description for the product</Typography>
                <Button className="mb-6" type="secondary">Login as User</Button>
                <Button className="mb-6" type="secondary">Login as Admin</Button>
                <Typography size="sm">By clicking Continue with, you agree to OurApp <a href="#">Terms of Use</a> and <a href="#">Privacy Policy.</a></Typography>
            </div>
        </div>
    )
}
