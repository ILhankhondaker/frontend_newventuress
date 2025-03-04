"use client";

// package import
import dynamic from "next/dynamic";
import { useState } from "react";

// local import 
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import PacificPagination from "@/components/ui/PacificPagination";
import {  AuctionProductResponse } from "@/types/auction";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const AuctionCard = dynamic(
  () => import("@/components/shared/cards/auction-card/auction-card")
);

const AllAuctionsContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);

 const session = useSession();
  const token = session.data?.user.token;
  console.log({ token });

  const { data } = useQuery<AuctionProductResponse>({
    queryKey: ["membership"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auction/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });

  console.log("auction data:", data);


  return (
    <div className="py-[40px] md:py-[60px] lg:py-[80px]">
      <SectionHeading heading="Our All Auctions" subheading="" />
      <div className="mt-[40px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-[30px] container">
      {data?.data?.map((auction, index) => (
  <AuctionCard key={auction._id} auction={auction} index={index} />
))}
      </div>
      <div className="mt-[40px]">
        <PacificPagination
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          totalPages={7 }
        />
      </div>
    </div>
  );
};

export default AllAuctionsContainer;
