import * as React from "react";
import mockData from "@/data/db";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import CheckoutPage from "./Checkout";

interface FixedAmountCoupon {
  type: string;
  amount: number;
  description: string;
}

interface PercentageCoupon {
  type: string;
  percentage: number;
  description: string;
}

type CouponType = FixedAmountCoupon | PercentageCoupon;

export default function CardWithForm() {
  const [selectedCoupon, setSelectedCoupon] = React.useState<CouponType | null>(
    null
  );
  const [pointUsed, setPointUsed] = React.useState<number>(0);
  const [points] = React.useState(mockData.points);
  const [useAllPoints, setUseAllPoints] = React.useState(false);

  const [key, setKey] = React.useState(+new Date());
  const [value, setValue] = React.useState<string | undefined>(undefined);

  const handleCouponSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCouponText = e.target.value;
    const selectedCoupon = mockData.coupons.find(
      (coupon) => coupon.description === selectedCouponText
    );
    console.log(selectedCoupon);
    setSelectedCoupon(selectedCoupon ?? null);
  };

  // input handle
  const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredPoint = parseInt(e.target.value);

    if (!Number.isNaN(enteredPoint)) {
      const totalPrice = calculateTotalPrice();
      if (enteredPoint >= 0) {
        if (enteredPoint <= totalPrice) {
          if (enteredPoint <= points) {
            setPointUsed(enteredPoint);
          } else {
            alert("보유 포인트보다 많이 입력하셨습니다!");
            setPointUsed(points);
          }
        } else {
          alert("최종 결제 금액을 초과하여 입력하셨습니다!");
          if (totalPrice <= points) {
            setPointUsed(totalPrice);
          } else {
            setPointUsed(points);
          }
        }
      } else {
        alert("음수 포인트는 입력할 수 없습니다!");
        setPointUsed(0);
      }
    } else {
      setPointUsed(0);
    }
  };

  // 전액 사용 버튼 handle
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUseAllPoints(e.target.checked);
    if (e.target.checked) {
      const totalPrice = calculateTotalPrice();
      if (points > 0) {
        if (points >= totalPrice) {
          alert("최종 결제 금액을 초과하여 입력하셨습니다!");

          setPointUsed(totalPrice);
        } else {
          setPointUsed(points);
        }
      } else {
        alert("보유 포인트가 없습니다!");
        setUseAllPoints(false);
      }
    } else {
      setPointUsed(0);
    }
  };

  const calculateDiscount = (totalBeforePointDeduction: number) => {
    if (!selectedCoupon) return 0;

    if (selectedCoupon.type === "정액제") {
      return (selectedCoupon as FixedAmountCoupon).amount ?? 0;
    } else if (selectedCoupon.type === "정률제") {
      return (
        (totalBeforePointDeduction *
          (selectedCoupon as PercentageCoupon).percentage) /
        100
      );
    }
    return 0;
  };

  // // 포인트 먼저 적용
  // const calculateTotalPrice = () => {
  //   const totalBeforePointDeduction = mockData.productPrice - pointUsed;
  //   const discount = calculateDiscount(totalBeforePointDeduction) ?? 0;
  //   return totalBeforePointDeduction - discount + mockData.deliveryFee;
  // };

  // 할인 먼저 적용
  const calculateTotalPrice = () => {
    const discount = calculateDiscount(mockData.productPrice) ?? 0;
    const totalBeforePointDeduction = mockData.productPrice - discount;
    const totalPriceAfterPointDeduction = totalBeforePointDeduction - pointUsed;
    return totalPriceAfterPointDeduction + mockData.deliveryFee;
  };

  return (
    <div className="flex gap-4 justify-center tracking-tighter text-sm mt-4">
      <div className="flex flex-col gap-4">
        <Card className="w-[600px] gap-3">
          <CardHeader>
            <CardTitle>주문 상품 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex space-y-1.5 gap-4">
                  <Image
                    src={"/logo.webp"}
                    alt={"logo"}
                    width={100}
                    height={100}
                  ></Image>
                  <div>
                    <Label htmlFor="iPhone">{mockData.products[0].name}</Label>
                    <p>(필수) 색상: Space Gray - 1개</p>
                    <p>{mockData.products[0].price}</p>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card className="w-[600px]">
          <CardHeader>
            <CardTitle>주문자 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex space-y-1.5 gap-4 justify-between">
                  <div>
                    <Label htmlFor="name">홍길동</Label>
                    <p>01012345678</p>
                    <p>pig123@naver.com</p>
                  </div>
                  <div>
                    <button>수정</button>
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5"></div>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card className="w-[600px]">
          <CardHeader>
            <CardTitle>배송 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col gap-4">
                  <Label htmlFor="name">홍길동</Label>
                  <p>01012345678</p>
                  <p>서울특별시 서대문구 성산로7길 89-8 (연희동)</p>
                  <p>주식회사 아임웹</p>
                  <p>01012345678</p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card className="w-[600px]">
          <CardHeader>
            <CardTitle>쿠폰/포인트</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <label htmlFor="Point">포인트 사용</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="Point"
                      placeholder="포인트를 입력하세요"
                      value={pointUsed}
                      onChange={handlePointChange}
                      className="pr-8 text-right"
                    />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                      원
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <input
                      type="checkbox"
                      id="useAllPoints"
                      checked={useAllPoints}
                      onChange={handleCheckboxChange}
                      name="option"
                    />
                    <span>전액 사용</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 ">
                  <label htmlFor="Coupon" className="flex-shrink-0">
                    쿠폰
                  </label>
                  <Select
                    key={key}
                    value={value}
                    onValueChange={(value) =>
                      handleCouponSelect({
                        target: { value },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="쿠폰선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockData.coupons.map((coupon, index) => (
                        <SelectItem key={index} value={coupon.description}>
                          {coupon.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setValue(undefined);
                      setSelectedCoupon(null);
                      setKey(+new Date());
                    }}
                  >
                    취소
                  </Button>
                </div>
              </div>
              <div className="flex flex-col space-y-1.5"></div>
            </div>
          </CardContent>
          <CardFooter className="grid place-items-start">
            <p>보유 포인트 : {mockData.points.toLocaleString()}</p>
            <p>5,000 포인트 이상 보유 및 10,000원 이상 구매시 사용 가능</p>
          </CardFooter>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle>최종 결제금액</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1">
                  <div className="flex w-full justify-between">
                    <p>상품 가격</p>
                    <p>1,000,000원</p>
                  </div>
                  <div className="flex w-full justify-between">
                    <p>쿠폰 할인</p>
                    <p>
                      -
                      {calculateDiscount(
                        mockData.productPrice
                      ).toLocaleString()}
                      {/* {calculateDiscount( // 포인트 먼저 적용시
                        mockData.productPrice - pointUsed
                      ).toLocaleString()} */}
                      원
                    </p>
                  </div>
                  <div className="flex w-full justify-between">
                    <p>포인트 사용</p>
                    <p>-{pointUsed.toLocaleString()}원</p>
                  </div>
                  <div className="flex w-full justify-between">
                    <p>배송비</p>
                    <p>+2,500원</p>
                  </div>
                </div>
              </div>
              <div className="ma-auto my-4 flex w-full items-center justify-evenly bg-stone-400 flex-grow h-px opacity-30"></div>
              <div className="flex w-full justify-between">
                <p>총 결제금액</p>
                <p>{calculateTotalPrice().toLocaleString()}원</p>
              </div>
            </form>
          </CardContent>
          <CardFooter className="bg-gray-50 p-4 pl-6">
            <div>
              <p>{(calculateTotalPrice() / 100).toFixed(0)} 포인트 적립 예정</p>
            </div>
          </CardFooter>
        </Card>
        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle>결제 방법</CardTitle>
          </CardHeader>
          <CardContent>
            <CheckoutPage
              totalPrice={calculateTotalPrice()}
              productName={mockData.products[0].name}
            />
          </CardContent>
          <CardFooter className="flex space-x-2 ">
            <input type="checkbox" name="option" />
            <span>현금영수증 신청</span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
