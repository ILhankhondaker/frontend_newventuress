// Vendor Information Type
export type VendorInfo = {
  _id: string;
  fullName: string;
  email: string;
};

// General Store Settings Type
export type GeneralSetting = {
  storeName: string;
  storeLogo: string;
  storeEmail: string;
  storeShortDescription: string;
  facebookURL: string;
};

// Social Media Settings Type
export type SocialMediaSetting = {
  _id: string;
  facebookTitle: string;
  facebookURL: string;
  instaTitle: string;
  instaURL: string;
};

// Store Policies and Support Information Type
export type PolicyAndSupport = {
  _id: string;
  policyTabLabel: string;
  shippingPolicy: string;
  returnPolicy: string;
  cancellationPolicy: string;
};

// Customer Support Details Type
export type CustomerSupport = {
  _id: string;
  phone: string;
  email: string;
  address: string;
  country: string;
  province: string;
};

// Address Type (Used for Billing and Shipping)
type Address = {
  _id: string;
  name: string;
  address: string;
  country: string;
  province: string;
};

// Store Data Type (Main Object Connecting All Entities)
export type StoreData = {
    _id:string
   generalSetting: GeneralSetting[];
  billingAddress: Address[];
  shippingAddress: Address[];
  customerSupport: CustomerSupport[];
  rating: number;
};

// API Response Type
export type vedorestoreDataResponse = {
    status:boolean
  data: StoreData[];
};
