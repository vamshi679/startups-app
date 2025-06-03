import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import {STARTUP_BY_ID_QUERY} from "@/sanity/lib/queries";
import {notFound} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

import markdownit from "markdown-it";

const md = markdownit();

const Page = async ({params} : Promise<{id: string}>) => {
    const id = (await params).id;
    console.log("id:", id);
    const post = await client.fetch(STARTUP_BY_ID_QUERY, {id});

    if(!post) return notFound();

    const parsedContent = md.render(post?.pitch || "");
    console.log("startup by id:", post);
    return(
        <>
            <section className="w-full bg-blue-100 pt-24 pb-10">
                <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center gap-8">
                    <p className="text-sm font-medium text-gray-500">{formatDate(post?._createdAt)}</p>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        {post.title}
                    </h1>
                    <p className="mt-4 text-lg leading-8 text-gray-700 max-w-2xl">
                        {post.description}
                    </p>
                </div>
            </section>

            <section className="w-full py-16 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <img
                        src={post.image}
                        alt="thumbnail"
                        height="350"
                        className="w-full h-auto rounded-2xl shadow-md"
                    />

                    <div className="space-y-10 mt-10">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                            <Link
                                href={`/user/${post.author?._id}`}
                                className="flex items-center gap-4"
                            >
                                <Image
                                    src={post.author.image}
                                    alt="avatar"
                                    width={64}
                                    height={64}
                                    className="rounded-full shadow"
                                />
                                <div>
                                    <p className="text-lg font-semibold text-gray-900">{post.author.name}</p>
                                    <p className="text-sm text-gray-500">@{post.author.username}</p>
                                </div>
                            </Link>
                            <p className="text-sm font-medium bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                                {post.category}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">Pitch Details</h3>
                            {parsedContent ? (
                                <article
                                    className="prose max-w-none font-sans break-words mt-4"
                                    dangerouslySetInnerHTML={{ __html: parsedContent }}
                                />
                            ) : (
                                <p className="text-gray-500 mt-4">No details provided</p>
                            )}
                        </div>
                    </div>

                    <hr className="my-12 border-t border-gray-200" />

                    {/*{editorPosts?.length > 0 && (*/}
                    {/*    <div>*/}
                    {/*        <p className="text-2xl font-semibold text-gray-900">Editor Picks</p>*/}
                    {/*        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">*/}
                    {/*            {editorPosts.map((post: StartupTypeCard, i: number) => (*/}
                    {/*                <StartupCard key={i} post={post} />*/}
                    {/*            ))}*/}
                    {/*        </ul>*/}
                    {/*    </div>*/}
                    {/*)}*/}

                    {/*<Suspense fallback={<Skeleton className="mt-12" />}>*/}
                    {/*    <View id={id} />*/}
                    {/*</Suspense>*/}
                </div>
            </section>
        </>
    )
}
export default Page;