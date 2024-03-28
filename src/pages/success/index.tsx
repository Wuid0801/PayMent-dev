import { useEffect } from "react";
import { useRouter } from "next/router";

function Index({ searchParams }) {
  const router = useRouter();
  useEffect(() => {
    if (!searchParams || !searchParams.orderId) {
      // searchParams가 없거나 orderId가 없는 경우에 대한 처리
      console.error('Missing orderId in searchParams');
      return;
    }

    const { orderId, amount, orderName } = searchParams;
    const requestData = {
      orderId,
      amount,
      orderName,
    };

    const url = `https://api.tosspayments.com/v1/payments/orders/${orderId}`;

    async function confirm() {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      console.log(response.body)
      const json = await response.json();

      if (!response.ok) {
        router.push(`/fail?message=${json.message}&code=${json.code}`);
        return;
      }
    }
    confirm();
  }, [searchParams, router]);

  return (
    <div className="result wrapper">
      <div className="box_section">
        <h2>결제 성공</h2>

        <p>{`주문번호: ${searchParams ? searchParams.orderId : ''}`}</p>
        <p>{`결제 금액: ${Number(searchParams ? searchParams.amount : 0).toLocaleString()}원`}</p>
        <p>{`orderName: ${searchParams ? searchParams.orderName : ''}`}</p>
      </div>
    </div>
  );
}

export default Index;
