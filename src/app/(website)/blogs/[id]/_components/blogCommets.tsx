"use client";

import Commentcard from "@/components/shared/cards/commentcard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { CommentsData } from "@/data/comment";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
// import NotFound from "@/components/shared/NotFound/NotFound";
import { TextAnimate } from "@/components/magicui/text-animate";
import ErrorContainer from "@/components/ui/error-container";

function BlogCommets() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id: blogID } = useParams();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // show a toast meesage

    setIsSubmitting(false);
  }

   // Fetch Blogs using React Query
const { isLoading, data, isError } = useQuery({
  queryKey: ["blog-comments", blogID], // Cache key includes blogID
  queryFn: async () => {
    if (!blogID) return null;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/comments?blogID=${blogID}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }
    const resData = await response.json();
    return resData.data;
  },
  enabled: !!blogID, // Only run query if blogID exists
});

  console.log("Blog comments", data);

  let content;

  if (isLoading) {
    content = (
      <div className="w-full h-[400px] flex justify-center items-center flex-col text-black">
        <Loader2 className="animate-spin opacity-80" />
        <p>Loading comments...</p>
      </div>
    );
  } else if (isError) {
    content = (
      <ErrorContainer message="Failed to load comments, Please try again!!"/>
    )
  } else if (!data) {
    content = (
      <div className="text-center py-5">
        {/* <NotFound message="No Review this Product" /> */}
        <TextAnimate animation="slideUp" by="word">
          No comment found on this blog!
        </TextAnimate>
      </div>
    )
  }else{
    content = <>
       <div className="flex flex-col items-start mt-5 w-full max-md:max-w-full">
          {data?.map((comment:any) => (
            <Commentcard
              key={comment._id}
              author={comment.fullName}
              date={comment.createdAt}
              content={comment.comments}
              avatarUrl={""}
              id={comment._id}
            />
          ))}
        </div>
        <Button variant="outline" size="sm" className="dark:bg-white dark:hover:bg-[#482D721A] dark:text-gradient-pink dark:border dark:border-[#6841A5] dark:shadow">
          Read More
        </Button>
    </>
  }
  

  return (
    <>
      <div className="py-4">
        <h3 className="text-2xl font-semibold mb-4 text-black">
          Leave us a comment
        </h3>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-[#444444] text-base">
                Full Name
              </Label>
              <Input
                id="fullName"
                placeholder="Write your full name"
                required
                className="border-[1px] border-[#C5C5C5] p-6 text-primary-black placeholder:text-[#C5C5C5] focus-visible:ring-0 focus-visible:ring-offset-0;"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#444444] text-base">
                Username or Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Write your user name or email"
                required
                className="border-[1px] border-[#C5C5C5] p-6 text-primary-black placeholder:text-[#C5C5C5] focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment" className="text-[#444444] text-base">
              Comments
            </Label>
            <Textarea
              id="comment"
              placeholder="Write your comments here.."
              required
              className="min-h-[150px]  border-[1px] border-[#C5C5C5] p-6 text-primary-black placeholder:text-[#C5C5C5] focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-[285px] h-[56px] "
            >
              {isSubmitting ? "Submitting..." : "Submit Comment"}
            </Button>
          </div>
        </form>
      </div>

      <div className="py-4">
        <div className="text-2xl font-medium leading-tight text-black">
          Comments
        </div>
       {content}
      </div>
    </>
  );
}

export default BlogCommets;
