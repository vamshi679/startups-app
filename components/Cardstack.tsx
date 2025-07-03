import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"
import { EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import {STARTUPS_QUERY_TEMP} from "@/sanity/lib/queries";
import {Author, Startup} from "@/sanity/types";
import {sanityFetch, SanityLive} from "@/sanity/lib/live";

export type StartupTypeCard = Omit<Startup, "author"> & { author? : Author}

export const Cardstack = async ({ searchQuery = "" }: { searchQuery?: string }) => {
  const {data : posts_new} = await sanityFetch({query: STARTUPS_QUERY_TEMP});
  const filteredPosts = searchQuery
    ? posts_new.filter((post: StartupTypeCard) =>
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts_new;

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      <div className="text-xl font-semibold mb-4">
        {searchQuery ? `Results for: "${searchQuery}"` : "All recent posts"}
      </div>
      {filteredPosts.length === 0 ? (
        <div className="text-center text-gray-500 py-12 text-lg font-medium">No posts found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts.map((post: StartupTypeCard, index: number) => (
            <Card key={post._id} className="bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 hover:bg-blue-100 ">
              <CardHeader className="text-sm text-gray-500 flex items-center justify-between">
                  <Badge variant="outline" className="text-sm text-orange-600 font-semibold text-right">{formatDate(post._createdAt)}</Badge>
                  <div className="flex items-center text-orange-600">
                      <EyeIcon className="w-4 h-4 mr-1 mt-1" />
                      <span className="text-sm">{post.views}</span>
                  </div>
              </CardHeader>
              <CardContent>
                  <Button variant="link" asChild>
                      <Link href={`/user/${post.author?._id}`} className="text-blue-600 font-semibold hover:underline">
                          <p>{post.author?.name}</p>
                      </Link>
                  </Button>
                  <CardTitle className="text-xl">
                      <Link href={`/startup/${post._id}`}>{post.title ?? "Untitled"}</Link>
                  </CardTitle>
                  <CardDescription>{post.description ?? "No description"}</CardDescription>
                  {post.image &&
                    <Image
                      src={post.image}
                      alt={post.title ?? "Startup image"}
                      className="card-image rounded-lg mt-3"
                      width={400}
                      height={100}
                      style={{ objectFit: "cover", height: "100px !important" }}
                    />
                  }
              </CardContent>
              <CardFooter className="text-sm text-gray-500 flex items-center justify-between">
                  <Badge variant="secondary" className="card-category mr-2">
                      <Link href={`/?query=${post.category?.toLowerCase()}`}>{post.category ?? "Uncategorized"}</Link>
                  </Badge>
                  <Button variant="link" asChild>
                      <Link href={`/startup/${post._id}`} className="text-blue-600 font-semibold">View Details</Link>
                  </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      <SanityLive/>
    </div>
  );
};

