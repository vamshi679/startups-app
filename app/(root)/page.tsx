import HeroSection from "../../components/Hero";
import SearchInput from "../../components/SearchInput";
import { Cardstack } from "@/components/Cardstack";
import { auth } from "@/auth";

export default async function Home({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
    const session = await auth();
    const query = typeof searchParams?.query === "string" ? searchParams.query : "";
    return (
        <>
          <HeroSection/>
          <SearchInput searchParams={searchParams} />
          <Cardstack searchQuery={query} />
        </>
      );
}
