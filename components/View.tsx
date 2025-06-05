
import Ping from "@/components/Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

// import { unstable_after as after } from "next/server";

const View = async ({ id }: { id: string }) => {
    const { views: totalViews } = await client
        .withConfig({ useCdn: false })
        .fetch(STARTUP_VIEWS_QUERY, { id });

    // TODO: To update the views count, we can use the `after` function to increment the views count
    await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit()

    return (
        <div className="flex justify-end items-center mt-4 fixed bottom-2 right-6 ">
            <div className="absolute -top-2 -right-2">
                <Ping />
            </div>

            <p className="font-medium text-[16px] bg-primary-100 px-2 py-2 mx-2 rounded-lg capitalize  bg-blue-300">
                <span className="font-black">Views: {totalViews}</span>
            </p>
        </div>
    );
};
export default View;
