import {
  reactExtension,
  Banner,
  BlockStack,
  Checkbox,
  Text,
  useApi,
  useCartLines,
  useApplyAttributeChange,
  useInstructions,
  useTranslate
} from "@shopify/ui-extensions-react/checkout";
import { useEffect, useState } from "react";
import { fetchCashbackOffer, createCashbackTransaction } from "./api-service";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function generateRandomId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 15);
}

function Extension() {
  const translate = useTranslate();
  const { extension, buyerIdentity } = useApi();
  const lines = useCartLines();
  const instructions = useInstructions();
  const applyAttributeChange = useApplyAttributeChange();

  const [cashbackOffer, setCashbackOffer] = useState(null);
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState(null);

   useEffect(() => {
    if (buyerIdentity?.email) {
      setEmail(buyerIdentity.email);
      console.log('Captured email:', buyerIdentity.email);
    } else {
      const testEmail = 'test@example.com';
      setEmail(testEmail);
      console.warn('Using test email:', testEmail);
    }
  }, [buyerIdentity]);




  useEffect(() => {
    const loadOffer = async () => {
      try {
        const offer = await fetchCashbackOffer();
        if (!offer) {
          setCashbackOffer(null);
          return;
        }
        setCashbackOffer(offer);
      } catch (err) {
        console.error("Error loading cashback offer", err);
        setCashbackOffer(null);
      }
    };
    loadOffer();
  }, []);


  if (!instructions.attributes.canUpdateAttributes) {
    return (
      <Banner title="Checkout UI" status="warning">
        {translate("attributeChangesAreNotSupported")}
      </Banner>
    );
  }

  if (!lines || !Array.isArray(lines)) {
    return (
      <BlockStack border="dotted" padding="tight">
        <Banner title="Loading..." status="info">
          <Text>Loading cashback offer...</Text>
        </Banner>
      </BlockStack>
    );
  }

  const orderAmount = lines.reduce((total, line) => {
    const price = line?.cost?.totalAmount?.amount;
    const quantity = line?.quantity || 0;
    if (price && !isNaN(price)) {
      return total + Number(price) * quantity;
    } else {
      console.warn("Invalid price or quantity for line:", line);
      return total;
    }
  }, 0);

  const eligible =
    cashbackOffer &&
    orderAmount >= parseFloat(cashbackOffer?.min_order_amount || "0");

  const cashbackAmount = eligible
    ? (
        (parseFloat(cashbackOffer?.cashback_percentage || "0") / 100) *
        orderAmount
      ).toFixed(2)
    : null;

  const onCheckboxChange = async (isChecked) => {
    setChecked(isChecked);

    await applyAttributeChange({
      key: "cashbackOptedIn",
      type: "updateAttribute",
      value: isChecked ? "yes" : "no",
    });

    if (isChecked && eligible) {
      const orderId = generateRandomId();
      const customerId = generateRandomId();

      try {
        await createCashbackTransaction({
          order_id: orderId,
          customer_id: customerId,
          customer_email: email,
          order_amount: orderAmount.toFixed(2),
          cashback_amount: cashbackAmount,
          status: "pending",
        });
      } catch (err) {
        console.error("Failed to record cashback transaction", err);
      }
    }
  };

  return (
    <BlockStack border="dotted" padding="tight">
      {eligible && cashbackOffer ? (
        <>
          <Banner title="Cashback Offer 🎉">
            <Text>
              Get{" "}
              <Text weight="bold">{cashbackOffer.cashback_percentage}% cashback</Text>{" "}
              on this order! You'll receive ₹{cashbackAmount}.
            </Text>
          </Banner>
          <Checkbox checked={checked} onChange={onCheckboxChange}>
            {translate("i_want_to_redeem_this_cashback_offer")}
          </Checkbox>
        </>
      ) : (
        <Banner title="Cashback Not Available" status="info">
          {cashbackOffer
            ? `Add ₹${cashbackOffer.min_order_amount} or more to get cashback.`
            : "No active cashback offer at the moment."}
        </Banner>
      )}
    </BlockStack>
  );
}