import React from "react";
import AuctionDetails from "./_components/AuctionDetails";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      
      <AuctionDetails auctionId={params.id} />
    </div>
  );
};

export default Page;
