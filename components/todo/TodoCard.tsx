import { Todo } from "@/state/atom/todoListAtom";
import { StyleModal, StylePressable, StyleText, StyleView } from "../style";
import { useState } from "react";
import { format } from "date-fns";
import { MarkTodoState } from "./MarkTodo";

export function TodoCard({ todo }: { todo: Todo }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <StyleView>
        <StyleText
          onPress={() => setIsOpen(true)}
          className="text-lg m-2 border-2 px-3 py-1 rounded-full border-gray-500"
        >
          <StyleText className="text-lg flex items-center">
            <StyleView>
              <MarkTodoState todo={todo} />
            </StyleView>
            <StyleText>{todo.title}</StyleText>
          </StyleText>
        </StyleText>
      </StyleView>
      <StyleModal animationType="slide" visible={isOpen}>
        <StyleView className="flex flex-1 items-center justify-center m-3">
          <StyleView className="border-2 w-full p-3 rounded-xl">
            <StyleText className="text-xl font-bold text-center">
              Todo
            </StyleText>
            <StyleView className="w-full gap-2">
              <StyleView className="flex justify-between">
                <StyleText className="text-lg">
                  <StyleView>
                    <MarkTodoState todo={todo} />
                  </StyleView>
                  <StyleText>{todo.title}</StyleText>
                </StyleText>
                {todo.deadline && (
                  <StyleText>{format(todo.deadline, "PPP")}</StyleText>
                )}
              </StyleView>
              <StyleText className="">{todo.description}</StyleText>
              <StylePressable onPress={() => setIsOpen(false)}>
                <StyleText className="text-white bg-black text-center p-2 my-2 rounded-lg">
                  Close Btn
                </StyleText>
              </StylePressable>
            </StyleView>
          </StyleView>
        </StyleView>
      </StyleModal>
    </>
  );
}
