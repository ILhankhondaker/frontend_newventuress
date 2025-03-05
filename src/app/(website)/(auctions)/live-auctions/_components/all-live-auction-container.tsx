"use client";
import AuctionCard from "@/components/shared/cards/auction-card/auction-card";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import PacificPagination from "@/components/ui/PacificPagination";
import { AuctionProductResponse } from "@/types/auction";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";


const AllLiveAuctionContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const session = useSession();
  const token = session.data?.user.token;
  console.log({ token });

  const { data } = useQuery<AuctionProductResponse>({
    queryKey: ["all-auctions", currentPage],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auction/all?page=${currentPage}&limit=8`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });

  console.log("auction data:", data);

  const liveAuctionsData = data?.data?.filter((liveAuction) => {
    const auctionEndTime = new Date(liveAuction.endingTime).getTime(); 
    return auctionEndTime > Date.now();
  });


  return (
    <div className="mb-[70px] mt-[40px]">
      <SectionHeading heading="Our Live Auctions" subheading="" />
      <div className="mt-[40px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-[30px] container">
      {liveAuctionsData?.map((auction, index) => (
      <AuctionCard key={auction._id} auction={auction} index={index} />
      ))}
      </div>
      <div className="mt-[40px]">
        {
          data?.pagination && data?.pagination?.totalPages > 1 && (
            <PacificPagination
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          totalPages={data?.pagination?.totalPages}
        />
          )
        }
      </div>
    </div>
  );
};

export default AllLiveAuctionContainer;
