import {auth} from "@/auth";
import {client} from "@/sanity/lib/client";
import {AUTHOR_BY_ID_QUERY} from "@/sanity/lib/queries";
import {notFound} from "next/navigation";
import Image from "next/image";
import {Card, CardContent} from "@/components/ui/card";
import {Suspense} from "react";
import UserStartups from "@/components/UserStartups";
import {StartupCardSkeleton} from "@/components/StartupCard";

export const experimental_ppr = true;

const Page = async ({params}: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const session = await auth();

    const user = await client.fetch(AUTHOR_BY_ID_QUERY, {id});
    if (!user) return notFound();

    return (
        <section className="px-4 md:px-8 lg:px-16 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
                <div className="lg:col-span-1"></div>
                {/* Profile Column */}
                <div className="lg:col-span-3">
                    <Card className="w-full">
                        <CardContent className="flex flex-col items-center p-6">
                            <h3 className="text-2xl font-bold uppercase text-center truncate">
                                {user.name}
                            </h3>
                            <Image
                                src={user.image}
                                alt={user.name}
                                width={220}
                                height={220}
                                className="rounded-full mt-4"
                            />
                            <p className="text-xl font-extrabold mt-6 text-center">
                                @{user?.username}
                            </p>
                            <p className="text-sm text-center mt-2 text-muted-foreground">
                                {user?.bio}
                            </p>
                        </CardContent>
                    </Card>
                </div>
                {/* Startups Column */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                    <p className="text-2xl font-bold">
                        {session?.id === id ? "Your" : "All"} Startups
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Suspense fallback={<StartupCardSkeleton/>}>
                            <UserStartups id={id}/>
                        </Suspense>
                    </ul>
                </div>
                <div className="lg:col-span-1"></div>
            </div>
        </section>
    );
};

export default Page;