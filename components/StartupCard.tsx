import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Author, Startup } from "@/sanity/types";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;

  return (
    <Card className="w-full">
      <CardContent className="p-5 flex flex-col gap-4">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>{formatDate(_createdAt)}</span>
          <span className="flex items-center gap-1">
            <EyeIcon className="w-4 h-4" />
            {views}
          </span>
        </div>

        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 space-y-1">
            <Link href={`/user/${author?._id}`} className="block">
              <p className="text-sm font-medium truncate">{author?.name}</p>
            </Link>
            <Link href={`/startup/${_id}`} className="block">
              <h3 className="text-xl font-semibold truncate">{title}</h3>
            </Link>
          </div>

          {author?.image && (
            <Link href={`/user/${author._id}`}>
              <Image
                src={author.image}
                alt={author.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            </Link>
          )}
        </div>

        <Link href={`/startup/${_id}`} className="block space-y-2">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
          <img
            src={image}
            alt="Startup preview"
            className="w-full rounded-xl object-cover h-48"
          />
        </Link>

        <div className="flex justify-between items-center pt-2">
          <Link
            href={`/?query=${category?.toLowerCase()}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            {category}
          </Link>
          <Button asChild size="sm">
            <Link href={`/startup/${_id}`}>Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const StartupCardSkeleton = () => (
  <>
    {[...Array(5)].map((_, index) => (
      <Card key={index} className="w-full">
        <CardContent className="p-5">
          <Skeleton className="h-4 w-1/3 mb-4" />
          <Skeleton className="h-5 w-2/3 mb-2" />
          <Skeleton className="h-5 w-full mb-3" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </CardContent>
      </Card>
    ))}
  </>
);

export default StartupCard;
