// import StartupForm from "@/components/StartupForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import StartupForm from "@/components/StartupForm";

const Page = async () => {

    // only authenticated users can access this page app will redirect to home page
    const session = await auth();
    if (!session) redirect("/");

    return (
        <>
            <section className="bg-blue-100 min-h-[230px] flex items-center justify-center">
                <h1 className="text-3xl font-bold text-gray-900">Submit Your Startup</h1>
            </section>

            <StartupForm />
        </>
    );
};

export default Page;