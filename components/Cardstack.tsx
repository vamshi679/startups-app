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
import {STARTUPS_QUERY, STARTUPS_QUERY_TEMP} from "@/sanity/lib/queries";
import {Author, Startup} from "@/sanity/types";
import {sanityFetch, SanityLive} from "@/sanity/lib/live";

export type StartupTypeCard = Omit<Startup, "author"> & { author? : Author}

const posts = [
  {
    _createdAt: new Date(),
    views: 122,
    author: { _id: 2, name: "Jane Doe" },
    _id: 2,
    description: "Exploring how AI is reshaping the future of automation.",
    image: "https://example.com/images/ai-automation.jpg",
    imgUrl: "https://random-image-pepebigotes.vercel.app/api/random-image",
    category: "Artificial Intelligence",
    title: "The Rise of Smart Machines",
  },
  {
    _createdAt: new Date(),
    views: 89,
    author: { _id: 3, name: "John Smith" },
    _id: 3,
    description: "A deep dive into robotic arms used in manufacturing.",
    image: "https://example.com/images/robotic-arm.jpg",
    imgUrl: "https://random-image-pepebigotes.vercel.app/api/random-image",
    category: "Robots",
    title: "Precision Robotics in Industry",
  },
  {
    _createdAt: new Date(),
    views: 203,
    author: { _id: 4, name: "Alice Johnson" },
    _id: 4,
    description:
      "Drones are more than just flying cameras—here's how they're changing logistics.",
    image: "https://example.com/images/drone-logistics.jpg",
    imgUrl: "https://random-image-pepebigotes.vercel.app/api/random-image",
    category: "Drones",
    title: "Drones and the Delivery Revolution",
  },
  {
    _createdAt: new Date(),
    views: 47,
    author: { _id: 5, name: "Bob Lee" },
    _id: 5,
    description:
      "Understanding the ethical dilemmas posed by autonomous robots.",
    image: "https://example.com/images/robot-ethics.jpg",
    imgUrl: "https://random-image-pepebigotes.vercel.app/api/random-image",
    category: "Ethics",
    title: "Can Robots Make Moral Choices?",
  },
  {
    _createdAt: new Date(),
    views: 150,
    author: { _id: 6, name: "Charlie Brown" },
    _id: 6,
    description:
      "Inside look at humanoid robots that mimic human movement and behavior.",
    image: "https://example.com/images/humanoid.jpg",
    imgUrl: "https://random-image-pepebigotes.vercel.app/api/random-image",
    category: "Humanoids",
    title: "Humanoids: Blurring the Line Between Man and Machine",
  },
];

export const Cardstack = async () => {

  // const posts_new = await client.fetch(STARTUPS_QUERY_TEMP)

  // const {data : posts_new} = await sanityFetch({query: STARTUPS_QUERY});
  const {data : posts_new} = await sanityFetch({query: STARTUPS_QUERY_TEMP});
  // console.log(JSON.stringify(posts_new,  null, 2));

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      <div className="text-xl font-semibold mb-4">All recent posts</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts_new.map((post: StartupTypeCard, index: number) => (
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
                    <Link href={`/startup/${post._id}`}>{post.title}</Link>
                </CardTitle>
                <CardDescription>{post.description}</CardDescription>
                <Image
                    src={post.image}
                    alt={post.title}
                    className="card-image rounded-lg mt-3"
                    width={400}
                    height={100}
                    style={{ objectFit: "cover", height: "100px !important" }}
                />
            </CardContent>
            <CardFooter className="text-sm text-gray-500 flex items-center justify-between">
                <Badge variant="secondary" className="card-category mr-2">
                    <Link href={`/?query=${post.category?.toLowerCase()}`}>{post.category}</Link>
                </Badge>
                <Button variant="link" asChild>
                    <Link href={`/startup/${post._id}`} className="text-blue-600 font-semibold">View Details</Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <SanityLive/>
    </div>
  );
};

