import { calculateTotal } from "./calculator";

describe("calculateTotal 함수", () => {
  test("기본 계산 - 1000원 상품 2개의 가격은 2000원이 나오는지 확인", () => {
    const price = 1000;
    const quantity = 2;
    const result = calculateTotal(price, quantity);
    expect(result).toBe(2000);
  });

  test("할인 적용 - 1000원 상품 2개를 10% 할인하면 1800원이 나오는지 확인", () => {
    const price = 1000;
    const quantity = 2;
    const discount = 0.1;
    const result = calculateTotal(price, quantity, discount);
    expect(result).toBe(1800);
  });

  test("기본 계산 - 2000원 상품 4개의 가격은 8000원이 나오는지 확인", () => {
    const price = 2000;
    const quantity = 4;
    const result = calculateTotal(price, quantity);
    expect(result).toBe(8000);
  });

  test("할인율 적용 - 5000원 상품 3개를 50% 할인하면 7500원이 나오는지 확인", () => {
    const price = 5000;
    const quantity = 3;
    const discount = 0.5;
    const result = calculateTotal(price, quantity, discount);
    expect(result).toBe(7500);
  });

  test("할인율이 0인 경우 - 3000원 상품 2개를 0% 할인하면 6000원이 나오는지 확인", () => {
    const price = 3000;
    const quantity = 2;
    const discount = 0;
    const result = calculateTotal(price, quantity, discount);
    expect(result).toBe(6000);
  });
});
