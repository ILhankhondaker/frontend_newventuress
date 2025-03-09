"use client";

import { useState, useMemo } from "react";
import { SearchBar } from "@/components/shared/sections/vendors/search-bar";
import { VendorCard } from "@/components/shared/cards/vendor-card";
import { useQuery } from "@tanstack/react-query";
import { vedorestoreDataResponse } from "@/types/vendorstore";

export default function VendorStore() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isError, isLoading, error } = useQuery<vedorestoreDataResponse>({
    queryKey: ["allstore"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/store`);
      if (!res.ok) throw new Error("Failed to fetch data");
      return res.json();
    },
  });

  const filteredVendors = useMemo(() => {
    if (!data?.data) return [];

    return data.data.filter(vendor =>
      vendor?.generalSetting?.some(setting =>
        setting.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        setting.storeEmail.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      vendor?.billingAddress?.some(address =>
        address.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, data]);

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading vendors...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500">Error: {error?.message}</div>;
  }

  return (
    <div className="min-h-screen bg-white vendor-store">
      <SearchBar
        onSearch={setSearchQuery}
        totalResults={filteredVendors.length}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
        {filteredVendors.map(vendor => (
          <VendorCard key={vendor._id} vendor={vendor} />
        ))}
      </div>
    </div>
  );
}
