import * as React from "react";
import mockData from "@/data/db";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

  const handleCouponSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCouponText = e.target.value;
    const selectedCoupon = mockData.coupons.find(
      (coupon) => coupon.description === selectedCouponText
    );
    console.log(selectedCoupon);
    setSelectedCoupon(selectedCoupon ?? null);
  };

  const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const point = parseInt(value); 
  
    if (!isNaN(point)) {
      setPointUsed(point); 
    } else {
      setPointUsed(0); 
    }
  };

  const calculateDiscount = () => {
    if (!selectedCoupon) return 0;

    if (selectedCoupon.type === "정액제") {
      return (selectedCoupon as FixedAmountCoupon).amount ?? 0;
    } else if (selectedCoupon.type === "정률제") {
      return (
        (mockData.productPrice *
          (selectedCoupon as PercentageCoupon).percentage) /
        100
      );
    }
    return 0;
  };
  const calculateTotalPrice = () => {
    const discount = calculateDiscount() ?? 0;
    const totalBeforePointDeduction = mockData.productPrice - discount + mockData.deliveryFee;
    return totalBeforePointDeduction - pointUsed; 
  };

  return (
    <div className="flex items-start gap-4 justify-center tracking-tighter text-sm">
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
              <div className="flex flex-col space-y-1.5 gap-4">
                <label htmlFor="Coupon">쿠폰</label>
                <Select onValueChange={(value) => handleCouponSelect({ target: { value } } as React.ChangeEvent<HTMLSelectElement>)}>
                  <SelectTrigger id="framework">
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

                <label htmlFor="CouponNumber">쿠폰 번호</label>
                <input
                  type="text"
                  id="CouponNumber"
                  placeholder="Coupon Number"
                />
                <label htmlFor="Point">포인트 사용</label>
                <input type="text" id="Point" placeholder="포인트를 입력하세요" onChange={handlePointChange}/>
              </div>
              <div className="flex flex-col space-y-1.5"></div>
            </div>
          </CardContent>
          <CardFooter className="grid place-items-start">
            <p>보유 포인트: 2,300</p>
            <p>5,000 포인트 이상 보유 및 10,000원 이상 구매시 사용 가능</p>
          </CardFooter>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>최종 결제금액</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1">
                  <div className="flex w-full justify-between">
                    <p>상품 가격</p>
                    <p>18,000원</p>
                  </div>
                  <div className="flex w-full justify-between">
                    <p>쿠폰 할인</p>
                    <p>-{calculateDiscount()}원</p>
                  </div>
                  <div className="flex w-full justify-between">
                    <p>포인트 사용</p>
                    <p>-{pointUsed}원</p>
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
                <p>{calculateTotalPrice()}원</p>
              </div>
            </form>
          </CardContent>
          <CardFooter className="bg-gray-50 p-4 pl-6">
            <div>
              <p>700 포인트 적립예정</p>
            </div>
          </CardFooter>
        </Card>
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>결제 방법</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="option" />
                    <span>신용카드</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="option" />
                    <span>가상계좌</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="option" />
                    <span>무통장 입금</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="option" />
                    <span>핸드폰 결제</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="option" />
                    <span>카카오페이</span>
                  </label>
                </div>

                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="DepositorName"
                  placeholder="입금자명 (미입력시 주문자명)"
                />
                <p className="text-xs">
                  주문 후 6시간 동안 미입금시 자동 취소됩니다
                </p>
              </div>
            </form>
            <div className="ma-auto mt-6 flex w-full items-center justify-evenly bg-stone-400 flex-grow h-px opacity-30"></div>
          </CardContent>
          <CardFooter className="flex space-x-2 ">
            <input type="checkbox" name="option" />
            <span>현금영수증 신청</span>
          </CardFooter>
        </Card>
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>전체 동의</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex space-x-2">
                  <input type="checkbox" name="option" />
                  <span>구매조건 확인 및 결제진행에 동의</span>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="bg-blue-500 p-4 grid place-items-center">
            <div className="text-white">결제하기</div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
