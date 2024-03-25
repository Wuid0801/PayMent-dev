import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function CardWithForm() {
  return (
    <div className="flex items-start gap-4 justify-center">
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
                    <Label htmlFor="Soap">Daily Facial Soap</Label>
                    <p>(필수) 용량 : 80ml - 1개</p>
                    <p>18000원</p>
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
                    <p>(필수) 용량 : 80ml - 1개</p>
                    <p>18000원</p>
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
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5 gap-4">
                  <Label htmlFor="Coupon">쿠폰</Label>
                  <Input id="Coupon" placeholder="Coupon" />
                  <Label htmlFor="CouponNumber">쿠폰 번호</Label>
                  <Input id="CouponNumber" placeholder="CouponNumber" />
                  <Label htmlFor="Point">쿠폰 포인트</Label>
                  <Input id="Point" placeholder="Point" />
                </div>
                <div className="flex flex-col space-y-1.5"></div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p>보유 포인트: 2,300</p>
            <p>5,000 포인트 이상 보유 및 10,000원 이상 구매시 사용 가능</p>
          </CardFooter>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>주문 상품 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex space-y-1.5 gap-4">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Name of your project" />
                </div>
                <div className="flex flex-col space-y-1.5"></div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>주문 상품 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex space-y-1.5 gap-4">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Name of your project" />
                </div>
                <div className="flex flex-col space-y-1.5"></div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>주문 상품 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex space-y-1.5 gap-4">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Name of your project" />
                </div>
                <div className="flex flex-col space-y-1.5"></div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
