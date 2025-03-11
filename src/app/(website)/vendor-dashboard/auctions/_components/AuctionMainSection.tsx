"use client";
import React, { useState } from "react";
import { AddListingForm } from "./AddListingForm";
import AuctionsFilter from "./auctions_filter";
import AuctionsHeader from "./auctions_header";
import AuctionListingContainer from "./auctions_listing_container";

const AuctionMainSection: React.FC = () => {
  const [showAddAuction, setShowAddAuction] = useState(false);
 

  return (
    <div className="space-y-[30px]">
      <AuctionsHeader showAddAuction={showAddAuction} setShowAddAuction={setShowAddAuction}   />
      <AuctionsFilter />
      {showAddAuction ? <AddListingForm setShowAddAuction={setShowAddAuction} /> : <AuctionListingContainer />}
    </div>
  );
};

export default AuctionMainSection;
