import * as React from "react";

import { Button } from "@/components/ui/button";
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

export default function CardWithForm() {
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
                    <p>-1,000원</p>
                  </div>
                  <div className="flex w-full justify-between">
                    <p>포인트 사용</p>
                    <p>-0원</p>
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
                <p>19,500원</p>
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
