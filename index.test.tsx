import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from ".";

test("X 버튼 클릭 시 onDelete props에 전달된 함수가 호출되는지 확인한다.", () => {
  const onDelete = jest.fn();
  render(<Input value="입력값" onChange={jest.fn()} onDelete={onDelete} />);

  const deleteButton = screen.getByRole("button", { name: "입력값 지우기" });

  fireEvent.click(deleteButton);

  expect(onDelete).toHaveBeenCalled();
});
