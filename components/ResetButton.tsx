"use client";
import Link from "next/link";
import {Button} from "@/components/ui/button";

const ResetButton = () => {
  const reset = () => {
    const form = document.querySelector("#search-form1") as HTMLFormElement;  
    console.log("Resetting form:", form);
    if (form) {form.reset()}
  };
  return (
    <Button variant="link" type="reset" className="my-2" onClick={reset}>
      <Link href="/" className="rounded-2xl bg-red-600 px-6 py-3 text-white font-semibold shadow-md hover:bg-red-700 transition">
        Clear Search
      </Link>
    </Button>
  );
};

export default ResetButton;
