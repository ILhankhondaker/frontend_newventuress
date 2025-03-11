"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface SponsoredListingItem {
  _id: string
  planTitle: string
  description: string
  price: number
  numberOfListing: number
  createdAt: string | Date
  updatedAt: string | Date
  __v: number
}

interface Props {
  data: SponsoredListingItem
  userId: string | undefined
}

const PlansCard = ({ data, userId }: Props) => {
  const handlePurchase = () => {
    // Your purchase logic here
    console.log("Purchase plan", data._id)
  }

  return (
    <Card className="border border-[#E6E6E6] rounded-[10px] overflow-hidden">
      <div className="bg-primary p-4 text-white">
        <h3 className="text-xl font-semibold">{data.planTitle}</h3>
      </div>
      <CardContent className="p-6">
        <div className="mb-4">
          <p className="text-3xl font-bold">{data.price}</p>
        </div>

        <div className="space-y-4 mb-6">
          <p className="text-gray-600">{data.description}</p>

          <div className="flex items-center justify-between border-t pt-2">
            <span className="font-medium">Number of Listings:</span>
            <span>{data.numberOfListing}</span>
          </div>
        </div>

        <Button className="w-full bg-primary hover:bg-primary/90" onClick={handlePurchase} disabled={!userId}>
          Purchase Now
        </Button>
      </CardContent>
    </Card>
  )
}

export default PlansCard

