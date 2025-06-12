import HeroSection from "../../components/Hero";
import SearchInput from "../../components/SearchInput";
import { Cardstack } from "@/components/Cardstack";
import { auth } from "@/auth";

export default async function Home() {

    const session = await auth();
    console.log("Home", session);
  return (
    <>
      <HeroSection/>
      <SearchInput />
      <Cardstack/>
    </>
  );
}
