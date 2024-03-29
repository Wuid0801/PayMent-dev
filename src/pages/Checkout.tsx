import React, { useEffect, useRef, useState } from "react";
import { loadPaymentWidget, ANONYMOUS, PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { CardFooter } from "@/components/ui/card";

// 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요.
// 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
const widgetClientKey = `${process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY}`;
const customerKey = "2K4_8BsfT0OGhFKkgibnM";
// const paymentWidget = PaymentWidget(widgetClientKey, PaymentWidget.ANONYMOUS) // 비회원 결제
interface Props {
  totalPrice: number;
  productName: string;
}
export default function CheckoutPage({ totalPrice, productName }: Props) {
  const [paymentWidget, setPaymentWidget] = useState<PaymentWidgetInstance|null>(null);
  const paymentMethodsWidgetRef = useRef<any>(null);
  const [price, setPrice] = useState(totalPrice);

  useEffect(() => {
    const fetchPaymentWidget = async () => {
      try {
        const loadedWidget = await loadPaymentWidget(widgetClientKey, customerKey);
        setPaymentWidget(loadedWidget);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    };

    fetchPaymentWidget();
  }, []);

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    // 결제 ui
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      { value: price },
      { variantKey: "DEFAULT" }
    );

    // 이용약관 ui
    paymentWidget.renderAgreement(
      "#agreement", 
      { variantKey: "AGREEMENT" }
    );

    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, [paymentWidget, price]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  const handlePaymentRequest = async () => {

    try {
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: productName,
        customerName: "김토스",
        customerEmail: "customer123@gmail.com",
        customerMobilePhone: "01012341234",
        successUrl: `${window.location.origin}/success?orderName=${encodeURIComponent(productName)}`,
        failUrl: `${window.location.origin}/fail`,
      });
    } catch (error) {
      console.error("Error requesting payment:", error);
    }
  };

  return (
    <div>
      <label htmlFor="coupon-box">
        <input
          id="coupon-box"
          type="checkbox"
          onChange={(event) => {
            setPrice(event.target.checked ? price - 5_000 : price + 5_000);
          }}
        />
        <span>5,000원 쿠폰 적용</span>
      </label>
      <div id="payment-widget" />
      <div id="agreement" />
      <CardFooter
        className="bg-blue-500 p-4 grid place-items-center cursor-pointer"
        onClick={handlePaymentRequest}
      >
        <button className="text-white">결제하기</button>
      </CardFooter>
    </div>
  );
}