import { useEffect } from "react";
import { useRouter } from "next/router";
export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    console.log(router)
    const { orderId, amount, paymentKey  } = router.query;

    const requestData = {
      orderId,
      amount,
      paymentKey,
    };

    async function confirm() {
      const response = await fetch("/api/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      console.log(response)
      const json = await response.json();

      if (!response.ok) {
        // 결제 실패 비즈니스 로직을 구현하세요.
        router.push(`/fail?message=${json.message}&code=${json.code}`);
        return;
      }

      // 결제 성공 비즈니스 로직을 구현하세요.
    }
    confirm();
  }, [router.query]);

  return (
    <div className="result wrapper">
      <div className="box_section">
        <h2>결제 성공</h2>
        <p>{`주문명: ${router.query.orderName}`}</p>
        <p>{`주문번호: ${router.query.orderId}`}</p>
        <p>{`결제 금액: ${Number(router.query.amount).toLocaleString()}원`}</p>
        <p>{`paymentKey: ${router.query.paymentKey}`}</p>
      </div>
    </div>
  );
}
