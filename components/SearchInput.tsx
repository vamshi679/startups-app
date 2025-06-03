import Form from "next/form";
import ResetButton from "./ResetButton";
import { Button } from "./ui/button";

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const query = searchParams?.query;
  const params = {search : query || null};
  console.log("SearchInput qurey params:", query, params);
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-4 text-center flex flex-col items-center justify-center">
        <div className="w-full max-w-xl flex flex-col sm:flex-row items-center gap-4">
          <Form action="/" scroll={false} id="search-form1">
            <input
                name="query"
                defaultValue={query}
                type="text"
                placeholder="Search your tools..."
                className="custom-input"
            />
            { query && <ResetButton/>}
            <Button variant="default" type="submit" className="my-3 p-6 w-md sm:w-auto bg-blue-600 text-white hover:bg-blue-700">
                Search
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}


// const SearchInput = async ({params} : Promise<{query: string}>) => {
//   const query = (await params).query;
//
//   return (
//
//       <div>
//         this is search input component {query}
//       </div>
//   )
// }