"use client";

import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
//import { useToast } from "@/hooks/use-toast"; >>>> old component deprecated.
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// import { createPitch } from "@/lib/actions";

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState("");
    // const { toast } = useToast();
    const router = useRouter();

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,
            };

            await formSchema.parseAsync(formValues);

            // const result = await createPitch(prevState, formData, pitch);
            //
            // if (result.status == "SUCCESS") {
            //     // toast("Success", {
            //     //     description: "Your startup pitch has been created successfully",
            //     // })
            //     toast.success("Your startup pitch has been created successfully")
            //     // toast({
            //     //     title: "Success",
            //     //     description: "Your startup pitch has been created successfully",
            //     // });
            //
            //     router.push(`/startup/${result._id}`);
            // }

            // return result;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErorrs = error.flatten().fieldErrors;

                setErrors(fieldErorrs as unknown as Record<string, string>);

                toast.error("Something went wrong, Please try again later. Your startup pitch has been created successfully");
                // toast({
                //     title: "Error",
                //     description: "Your startup pitch has been created successfully",
                //     variant: "destructive",
                // });

                return { ...prevState, error: "Validation failed", status: "ERROR" };
            }

            toast.error("An unexpected error has occurred");
            // toast({
            //     title: "Error",
            //     description: "An unexpected error has occurred",
            //     variant: "destructive",
            // });

            return {
                ...prevState,
                error: "An unexpected error has occurred",
                status: "ERROR",
            };
        }
    };

    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: "",
        status: "INITIAL",
    });

    return (
        <form action={formAction} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <Input
                    id="title"
                    name="title"
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 mt-1"
                    required
                    placeholder="Startup Title"
                />
                {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <Textarea
                    id="description"
                    name="description"
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 mt-1 resize-none h-32"
                    required
                    placeholder="Startup Description"
                />
                {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
            </div>

            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                </label>
                <Input
                    id="category"
                    name="category"
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 mt-1"
                    required
                    placeholder="Startup Category (Tech, Health, Education...)"
                />
                {errors.category && <p className="text-sm text-red-600 mt-1">{errors.category}</p>}
            </div>

            <div>
                <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                    Image URL
                </label>
                <Input
                    id="link"
                    name="link"
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 mt-1"
                    required
                    placeholder="Startup Image URL"
                />
                {errors.link && <p className="text-sm text-red-600 mt-1">{errors.link}</p>}
            </div>

            <div data-color-mode="light">
                <label htmlFor="pitch" className="block text-sm font-medium text-gray-700">
                    Pitch
                </label>
                <div className="mt-2 rounded-2xl overflow-hidden">
                    <MDEditor
                        value={pitch}
                        onChange={(value) => setPitch(value as string)}
                        id="pitch"
                        preview="edit"
                        height={300}
                        textareaProps={{
                            placeholder: "Briefly describe your idea and what problem it solves",
                        }}
                        previewOptions={{
                            disallowedElements: ["style"],
                        }}
                    />
                </div>
                {errors.pitch && <p className="text-sm text-red-600 mt-1">{errors.pitch}</p>}
            </div>

            <Button
                type="submit"
                variant="outline"
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md transition disabled:opacity-50"
                disabled={isPending}
            >
                {isPending ? "Submitting..." : "Submit Your Pitch"}
                <Send className="size-6 ml-2" />
            </Button>
        </form>
    );
};

export default StartupForm;