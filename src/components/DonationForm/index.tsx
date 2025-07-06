import * as React from "react";
import * as Sentry from "@sentry/astro";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import logo from "@/image/logo-mqt-2.svg";
import { ArrowLeft, HeartHandshake } from "lucide-react";

import config from "@/config/donationForm";
import { cn } from "@/lib/utils";
import { SecureShield } from "@/components/icons/SecureShield";
import { STRIPE_PUBLISHABLE_KEY, APP_ROOT_URL_CLNT } from "astro:env/client";
import LoadingSpinner from "../LoadingSpinner";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const donateFormButtonStyles =
  "w-full bg-transparent rounded-[6px] h-12 shadow-sm leading-none font-donate-form font-medium normal-case py-1";

export const submitButtonStyles =
  "py-2 w-full text-center text-md lg:text-lg text-white bg-primary-blue-3 rounded-[6px]";

interface DonationFormProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
  onBack?: () => void;
  showBackButton?: boolean;
}

const DonationForm: React.FC<DonationFormProps> = ({ className, ...props }) => {
  const [showBackButton, setShowBackButton] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [formSuccess, setFormSuccess] = React.useState<string | null>(null);
  const [customAmount, setCustomAmount] = React.useState<string>("35");
  const [selectedAmount, setSelectedAmount] = React.useState<number | null>(
    null,
  );
  const [emailInput, setEmailInput] = React.useState<string>("");
  const [clientSecret, setClientSecret] = React.useState<string | null>(null);
  const [showStripeFormElements, setShowStripeFormElements] =
    React.useState<boolean>(false);

  const { donationValuesMonthly, donationValuesOneTime } = config;
  const presetAmounts = {
    monthly: donationValuesMonthly?.map((item) => item.value),
    "one-time": donationValuesOneTime?.map((item) => item.value),
  };
  const [donationType, setDonationType] = React.useState<
    "monthly" | "one-time"
  >("one-time");

  // Add ref for error announcements
  const errorRef = React.useRef<HTMLDivElement>(null);

  const handleInputChange = React.useCallback((e: any) => {
    e.preventDefault();
    setEmailInput(e.target.value);
  }, []);

  const handleFetchClientSecret = React.useCallback(
    async (e: React.FormEvent) => {
      setIsLoading(true);
      setFormError(null); // Reset any previous errors
      e.preventDefault();
      const formData = new FormData();

      try {
        if (!selectedAmount && !customAmount) {
          setFormError("Please enter or select an amount to donate");
          setIsLoading(false);
          return;
        }

        const amount = customAmount ?? selectedAmount;
        const isRecurring = donationType === "monthly";
        if (isRecurring && !emailInput) {
          setFormError(
            "Please enter your email address to start a monthly donation",
          );
          setIsLoading(false);
          return;
        }

        formData.append("amount", amount);
        formData.append("isRecurring", isRecurring.toString());
        formData.append("email", emailInput ?? "");
        const response = await fetch(window.location.href, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { clientSecret, error } = await response.json();
        if (!clientSecret) {
          throw new Error("Client secret not found");
        }
        if (error) {
          throw new Error(error);
        }

        setClientSecret(clientSecret);
        setShowStripeFormElements(true);
        setIsLoading(false);
      } catch (error) {
        Sentry.captureException(error);
        setFormError("An error occurred. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    },
    [customAmount, selectedAmount, emailInput, donationType],
  );

  const handleAmountSelect = React.useCallback((amount: number) => {
    setSelectedAmount(amount);
  }, []);

  const handleCustomAmountChange = React.useCallback((e: any) => {
    e.preventDefault();
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  }, []);

  const toggleShowSection = React.useCallback(() => {
    const section = document.getElementById("infoSection");
    const formWrapper = document.getElementById("donationForm");
    section?.classList.remove("hidden");
    section?.classList.add("block");
    formWrapper?.classList.add("hidden");
    formWrapper?.classList.remove("block");
  }, []);

  const handleSetDonationType = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const type = e.target.value;
    if (type === "monthly" || type === "one-time") {
      setDonationType(type)
    } else {
      setFormError("Error occurred, please try again later");
    }
  }, [])

  React.useEffect(() => {
    if (selectedAmount) {
      setCustomAmount(selectedAmount.toString());
    }
  }, [selectedAmount]);

  React.useEffect(() => {
    const checkViewport = () => {
      setShowBackButton(window.innerWidth < 1024);
    };

    // Initial check
    checkViewport();

    // Handle resize
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);


  return (
    <Card
      {...props}
      className={cn("w-full mx-auto max-w-[400px]", className)}
      role="region"
      aria-label="Donation Form"
    >
      <CardHeader className="text-center">
        <img
          loading="lazy"
          decoding="async"
          src={logo.src}
          alt="United Way of Marquette County logo"
          className="w-10 aspect-auto m-4 font-heading"
        />
        <CardDescription className="flex flex-col items-start justify-start gap-1">
          {showBackButton && (
            <button
              onClick={toggleShowSection}
              type="button"
              className="w-max flex flex-row items-center peer-hover:hidden justify-start gap-1 ml-2 hover:opacity-75 transition-opacity"
              aria-label="Return to information section"
            >
              <ArrowLeft
                className="w-[12px] h-[12px] mt-auto mb-[2px]"
                aria-hidden="true"
              />
              <span className="text-sm">Back to information</span>
            </button>
          )}
          <div className="w-max flex flex-row items-center gap-1 ml-2">
            <SecureShield
              className="w-3 fill-secondary-green-2"
              aria-hidden="true"
            />
            <h2 className="text-lg lg:text-xl font-donate-form normal-case">
              Secure donation
            </h2>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 p-4">
          {formError && (
            <div
              className="text-red-500 text-center mb-4"
              role="alert"
              ref={errorRef}
            >
              {formError}
            </div>
          )}

          {isLoading && <LoadingSpinner aria-label="Loading payment form" />}

          {showStripeFormElements && clientSecret ? (
            <Elements
              stripe={stripePromise}
              options={{
                appearance: { theme: "stripe" },
                clientSecret,
              }}
            >
              <PaymentForm emailInput={emailInput} />
            </Elements>
          ) : (
            <form
              onSubmit={handleFetchClientSecret}
              id="donationForm"
              aria-label="Donation amount selection"
            >
              <fieldset className="space-x-2 flex flex-row justify-center items-center text-md lg:text-lg">
                <legend className="sr-only">Select donation frequency</legend>
                <div className="w-1/2 flex-1">
                  <input
                    type="radio"
                    id="monthly"
                    name="donationType"
                    value="monthly"
                    checked={donationType === "monthly"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSetDonationType(e)}
                    className="sr-only"
                  />
                  <label
                    htmlFor="monthly"
                    className={cn(
                      donateFormButtonStyles,
                      "flex justify-center items-center cursor-pointer",
                      donationType === "monthly"
                        ? "bg-primary-yellow-4 ring-2 ring-primary-yellow-1 shadow-sm shadow-primary-yellow-2"
                        : "",
                    )}
                  >
                    <HeartHandshake className="h-[12px]" aria-hidden="true" />
                    <span>Monthly</span>
                  </label>
                </div>

                <div className=" w-1/2 flex flex-row justify-center items-center">
                  <input
                    type="radio"
                    id="one-time"
                    name="donationType"
                    value="one-time"
                    checked={donationType === "one-time"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSetDonationType(e)}
                    className="sr-only"
                  />
                  <label
                    htmlFor="one-time"
                    className={cn(
                      donateFormButtonStyles,
                      "flex justify-center items-center cursor-pointer",
                      donationType === "one-time"
                        ? "  bg-primary-yellow-4 ring-2 ring-primary-yellow-1 shadow-sm  shadow-primary-yellow-2"
                        : "",
                    )}
                  >
                    One Time
                  </label>
                </div>
              </fieldset>

              <fieldset className="space-y-2 my-2">
                <legend className="sr-only">
                  Select or enter donation amount
                </legend>
                <div className="grid grid-cols-3 gap-1 lg:gap-2">
                  {presetAmounts[donationType].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleAmountSelect(amount)}
                      className={cn(
                        " shadow-tertiary-black-3 px-2 py-1 text-sm lg:text-md font-medium",
                        donateFormButtonStyles,
                        selectedAmount === amount
                          ? "bg-primary-yellow-4 ring-2 ring-primary-yellow-1 shadow-sm shadow-primary-yellow-2"
                          : "",
                      )}
                      aria-pressed={selectedAmount === amount}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>

                {/* Custom Amount Input */}
                <div className="flex flex-row items-center shadow-sm shadow-tertiary-black-3 rounded-[12px] px-2 py-6 max-h-8 font-donate-form">
                  <label htmlFor="custom-amount" className="sr-only">
                    Enter custom amount
                  </label>
                  {customAmount && (
                    <span
                      className="font-extralight font-donate-form text-lg text-tertiary-black-2  tracking-wider"
                      aria-hidden="true"
                    >
                      $
                    </span>
                  )}

                  <input
                    id="custom-amount"
                    type="number"
                    min="1"
                    step="any"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="max-h-8 w-full text-lg lg:text-xl text-primary-blue-2  font-medium placeholder:text-md lg:placeholder:text-lg placeholder:font-semibold border-none outline-none focus:outline-none active:outline-none focus:ring-0 ring-0 active:ring-0 focus-visible:ring-0 focus-visible:outline-none appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                    placeholder="Other amount"
                  />
                  <span
                    className="text-lg text-tertiary-black-3"
                    aria-hidden="true"
                  >
                    USD
                  </span>
                </div>
                <div className="flex flex-row items-center shadow-sm shadow-tertiary-black-3 rounded-[12px] px-2 py-6 max-h-8 font-donate-form">
                  <label htmlFor="email" className="sr-only">
                    Donor email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={emailInput}
                    required={donationType === "monthly"}
                    className="max-h-8 w-full text-lg lg:text-xl text-primary-blue-2 font-medium placeholder:text-md lg:placeholder:text-lg placeholder:font-semibold border-none outline-none focus:outline-none active:outline-none focus:ring-0 ring-0 active:ring-0 focus-visible:ring-0 focus-visible:outline-none appearance-none"
                    placeholder="Email"
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />
                </div>
              </fieldset>

              {formSuccess && (
                <div className="text-green-500 text-center mt-4">
                  {formSuccess}
                </div>
              )}
              <button
                type="submit"
                className={submitButtonStyles}
                disabled={(!selectedAmount && !customAmount) || isLoading}
                aria-busy={isLoading}
              >
                {isLoading && ""}
                {donationType === "monthly"
                  ? "Start Monthly Donation"
                  : "Donate Now"}
              </button>
            </form>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface PaymentFormProps {
  emailInput: string | undefined;
}
const PaymentForm: React.FC<PaymentFormProps> = ({ emailInput }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [formError, setFormError] = React.useState<string | null>(null);

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!stripe || !elements) {
        return;
      }

      setIsLoading(true);
      setFormError(null);
      try {
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${APP_ROOT_URL_CLNT}/donate/success`,
            payment_method_data: {
              billing_details: {
                email: emailInput ?? "",


              }
            }
          },
        });

        if (error) {
          if (
            error.type === "card_error" ||
            error.type === "validation_error"
          ) {
            setFormError(
              error.message ?? "An error occurred. Please try again later.",
            );
          } else {
            setFormError("An unexpected error occurred.");
          }
        }
      } catch (error) {
        Sentry.captureException(error);
        setFormError("An error occurred. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    },
    [stripe, elements],
  );

  return (
    // Fix: Remove the arrow function, just pass handleSubmit directly
    <form onSubmit={handleSubmit} id="payment-form">
      <PaymentElement id="payment-element" options={{ layout: "accordion" }} />
      {!isLoading && (
        <>
          <button
            type="submit"
            className={submitButtonStyles}
            disabled={!stripe || isLoading || !elements}
            id="submit"
          >
            <span id="button-text">{isLoading ? "" : "Pay Now"}</span>
          </button>
          {formError && <p className="text-red-500">{formError}</p>}
        </>
      )}
    </form>
  );
};

export default DonationForm;
