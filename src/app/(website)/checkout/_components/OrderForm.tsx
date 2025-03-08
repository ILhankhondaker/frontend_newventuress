"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import OrderSummary from "./OrderSummery";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import * as z from "zod";
import OrderConfirmationModal from "./OrderConfirmationModal";
import OrderTotal from "./OrderTotal";
import { useAppSelector } from "@/redux/store";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
  apartment: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone must be at least 5 digits"),
  paymentMethod: z.string().min(1, "Payment type is required"),
  cardholderName: z.string(),
  cardNumber: z.string(),
  expDate: z.string(),
  cvv: z.string(),
  coupon: z.string().optional(),
});

const OrderForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const cartItems = useAppSelector((state) => state.cart.items);

  const calculateTotals = () => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.discountPrice * item.quantity,
      0
    );
    const shipping = subtotal > 0 ? 100 : 0;
    const tax = subtotal * 0.01;
    const total = subtotal + shipping + tax;
    return { subtotal, shipping, tax, total };
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      country: "",
      city: "",
      address: "",
      apartment: "",
      email: "",
      phone: "",
      paymentMethod: "creditCard",
      cardholderName: "",
      cardNumber: "",
      expDate: "",
      cvv: "",
      coupon: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setShowModal(true);
    console.log(values);
  };

 const { subtotal, shipping, total } = calculateTotals();
 console.log(subtotal, total);
  return (
    <section className="w-[95%] mx-auto md:w-full px-[16px] md:px-0 py-[40px] md:py-[60px] lg:py-[80px]">
      {showModal && <OrderConfirmationModal />}
      <Form {...form}>

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex justify-center gap-[30px] flex-wrap">
            <div className="flex flex-col gap-[30px] w-[570px]">
              <h1 className="text-gradient dark:text-gradient-pink text-xl md:text-2xl lg:text-[32px] font-semibold leading-[24px] md:leading-[32px] lg:leading-[38px]">
                Billing Information
              </h1>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#444444]">
                      Full Name<span className="text-[#E10E0E]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        type=""
                        {...field}
                        className="h-[48px] border border-[#B0B0B0]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#444444]">
                      Country<span className="text-[#E10E0E]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        type="text"
                        {...field}
                        className="h-[48px] border border-[#B0B0B0]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#444444]">
                      Town/City/Region<span className="text-[#E10E0E]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        type="text"
                        {...field}
                        className="h-[48px] border border-[#B0B0B0]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#444444]">
                      Address<span className="text-[#E10E0E]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        type="text"
                        {...field}
                        className="h-[48px] border border-[#B0B0B0]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="apartment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#444444]">Apartment/Floor</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        type="text"
                        {...field}
                        className="h-[48px] border border-[#B0B0B0]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#444444]">
                      Email<span className="text-[#E10E0E]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        type="text"
                        {...field}
                        className="h-[48px] border border-[#B0B0B0]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#444444]">Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        type="text"
                        {...field}
                        className="h-[48px] border border-[#B0B0B0]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center space-x-2">
                <Checkbox id="save-info" />
                <Label
                  htmlFor="save-info"
                  className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Save this information for faster check-out next time
                </Label>
              </div>
            </div>

            {/* right side content---------------------------- */}

            <div className="w-[570px] ">
              <h1 className="text-gradient dark:text-gradient-pink text-xl md:text-2xl lg:text-[32px] font-semibold leading-[24px] md:leading-[32px] lg:leading-[38px] pb-[32px]">
                Order Summary
              </h1>
              <div>
                {cartItems.map((item, index) => (
                  <div key={index} className={index > 0 ? "mt-4" : ""}>
                    <OrderSummary image={item.image} title={item.title} sellingPrice={item.sellingPrice} />
                  </div>
                ))}
              </div>

              <OrderTotal subtotal={subtotal} total={total} shippingCharge={shipping} />

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                      
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col gap-3"
                      >
                        <div>
                          <Label
                            htmlFor="creditCard"
                            className={`w-full border cursor-pointer rounded-lg flex items-center justify-between px-4 py-3 ${
                              field.value === "creditCard"
                                ? "bg-[#E6EEF6] border-[#121D42] dark:border-[#6841A5]"
                                : "border-zinc-200"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem
                              
                                id="creditCard"
                                value="creditCard"
                                className="h-5 w-5 border-[#121D42] dark:border-[#6841A5] text-[#121D42] before:bg-[#121D42] data-[state=checked]:border-[#121D42] data-[state=checked]:text-[#121D42]"
                              />
                              <span
                                className={`text-sm dark:text-gradient-pink ${
                                  field.value === "creditCard"
                                    ? "text-gradient dark:text-gradient-pink"
                                    : ""
                                }`}
                              >
                                Credit Card
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Image
                                src="/assets/img/cVisa.png"
                                alt="PayPal"
                                height={25}
                                width={40}
                              />
                              <Image
                                src="/assets/img/mastercard.png"
                                alt="PayPal"
                                height={25}
                                width={40}
                              />
                            </div>
                          </Label>

                          {field.value === "creditCard" && (
                            <div className="space-y-3 mt-3">
                              <FormField
                                control={form.control}
                                name="cardholderName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        placeholder="Cardholder Name"
                                        {...field}
                                        className="h-[48px] border border-[#B0B0B0]"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="cardNumber"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        placeholder="Card Number"
                                        {...field}
                                        className="h-[48px] border border-[#B0B0B0]"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div className="grid grid-cols-2 gap-3">
                                <FormField
                                  control={form.control}
                                  name="expDate"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          placeholder="Exp.Date"
                                          {...field}
                                          className="h-[48px] border border-[#B0B0B0]"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="cvv"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          placeholder="CVV"
                                          {...field}
                                          className="h-[48px] border border-[#B0B0B0]"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <Label
                          htmlFor="paypal"
                          className={`w-full border cursor-pointer rounded-lg flex items-center justify-between px-4 py-4 ${
                            field.value === "paypal"
                              ? "bg-[#E6EEF6] border-[#121D42] dark:border-[#6841A5]"
                              : "border-zinc-200"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <RadioGroupItem
                              id="paypal"
                              value="paypal"
                              className="h-5 w-5 border-[#121D42] dark:border-[#6841A5] text-[#121D42] before:bg-[#121D42] data-[state=checked]:border-[#121D42] data-[state=checked]:text-[#121D42]"
                            />
                            <span
                              className={`text-sm dark:text-gradient-pink ${
                                field.value === "paypal" ? "text-[#121D42]" : ""
                              }`}
                            >
                              PayPal
                            </span>
                          </div>
                          <Image
                            src="/assets/img/ppLogo.png"
                            alt="PayPal"
                            height={30}
                            width={60}
                          />
                        </Label>

                        <Label
                          htmlFor="cashOnDelivery"
                          className={`w-full border cursor-pointer rounded-lg flex items-center justify-between px-4 py-3 ${
                            field.value === "cashOnDelivery"
                              ? "bg-[#E6EEF6] border-[#121D42]"
                              : "border-zinc-200"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <RadioGroupItem
                              id="cashOnDelivery"
                              value="cashOnDelivery"
                              className="h-5 w-5 border-[#121D42] text-[#121D42] before:bg-[#121D42] data-[state=checked]:border-[#121D42] data-[state=checked]:text-[#121D42]"
                            />
                            <span
                              className={`text-sm dark:text-gradient-pink ${
                                field.value === "cashOnDelivery"
                                  ? "text-[#121D42]"
                                  : ""
                              }`}
                            >
                              Cash on delivery
                            </span>
                          </div>
                          <span
                            role="img"
                            aria-label="Cash on delivery"
                            className="text-xl"
                          >
                            <Image
                              src="/assets/img/visa.png"
                              alt="PayPal"
                              height={30}
                              width={50}
                            />
                          </span>
                        </Label>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-7">
                <FormField
                  control={form.control}
                  name="coupon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gradient text-[16px] dark:text-gradient-pink">
                        Add Coupon{" "}
                      </FormLabel>
                      <span className="text-[#9C9C9C] text-[10px]">
                        {" "}
                        (Add coupon if you want to have discount)
                      </span>
                      <FormControl>
                        <Input
                          placeholder=""
                          type="text"
                          {...field}
                          className="h-[48px] border border-[#B0B0B0]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                className="relative w-full mt-5"
                aria-label="Place Order"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing" : "Place Order"}
                {isSubmitting && (
                  <Loader2 className="absolute right-5 top-4 h-6 w-5 animate-spin" />
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default OrderForm;
