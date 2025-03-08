/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
// import CategoryFilter from "./category-filter/category-filter"; // adjust import if needed
import { Select } from "@/components/ui/select";

export default function SidebarFilters({
  onFilterChange,
  priceRange,
}: {
  onFilterChange: (filters: any) => void;
  priceRange: [number, number];
}) {
  const [flowers, setFlowers] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string>("in stock");

  // const flowerOptions = ["Indica", "Sativa", "Hybrid"];

  // Handle slider changes for price
  const handlePriceChange = (value: number[]) => {
    if (value[0] <= value[1]) {
      onFilterChange({ priceRange: value, flowers, availability }); // Pass the updated price range
    }
  };

  // Handle input field changes for price
  const handleInputChange = (index: number, newValue: number) => {
    const updatedRange = [...priceRange];
    updatedRange[index] = newValue;
    if (updatedRange[0] <= updatedRange[1]) {
      onFilterChange({ priceRange: updatedRange as [number, number], flowers, availability }); // Pass the updated price range
    }
  };

  // Toggle flower selection
  // const handleFlowerToggle = (flower: string) => {
  //   setFlowers((prev) =>
  //     prev.includes(flower) ? prev.filter((f) => f !== flower) : [...prev, flower]
  //   );
  // };

  // Handle availability changes
  // const handleAvailabilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setAvailability(e.target.value);
  //   onFilterChange({ priceRange, flowers, availability: e.target.value }); // Pass availability filter
  // };

  return (
    <aside className="w-[270px] space-y-4 mt-[52px]">
      {/* Price Filter */}
      <div className="rounded-lg bg-[#E6EEF6] dark:bg-[#482D721A] p-4">
        <h2 className="text-[28px] font-bold text-gradient dark:text-gradient-pink mb-4">
          Filter by Price
        </h2>
        <Slider
          value={priceRange} // bind to local state
          max={1000}
          min={0}
          step={1}
          minStepsBetweenThumbs={5}
          onValueChange={handlePriceChange} // update price range state
          className="my-4"
        />
        <div className="flex gap-4 items-center">
          <div className="space-y-1.5">
            <Label className="text-[11px] text-[#9C9C9C]">Starting Price</Label>
            <Input
              type="number"
              value={priceRange[0]}
              onChange={(e) => handleInputChange(0, +e.target.value)}
              className="h-9"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-[11px] text-[#9C9C9C]">Ending Price</Label>
            <Input
              type="number"
              value={priceRange[1]}
              onChange={(e) => handleInputChange(1, +e.target.value)}
              className="h-9"
            />
          </div>
        </div>
      </div>

      {/* Shop by Flowers */}
      {/* <div className="rounded-lg bg-[#E6EEF6] dark:bg-[#482D721A] p-4">
        <h2 className="text-[28px] leading-[30px] font-bold text-gradient dark:text-gradient-pink mb-4">
          Shop by Flowers
        </h2>
        <p className="text-[18px] text-[#434851] mb-3">Sub Categories List</p>
        <div className="space-y-3">
          {flowerOptions.map((flower) => (
            <div key={flower} className="flex items-center space-x-2">
              <Checkbox
                id={flower}
                checked={flowers.includes(flower)}
                onChange={() => handleFlowerToggle(flower)}
              />
            </div>
          ))}
        </div>
      </div> */}

      {/* Availability Filter */}
      {/* <div className="rounded-lg bg-[#E6EEF6] dark:bg-[#482D721A] p-4">
        <h2 className="text-[28px] leading-[30px] font-bold text-gradient dark:text-gradient-pink mb-4">
          Availability
        </h2>
        <Select
          options={[
            { value: "in stock", label: "In stock" },
            { value: "out of stock", label: "Out of stock" },
          ]}
          value={availability}
          onChange={handleAvailabilityChange}
        />
      </div> */}
    </aside>
  );
}

