import { Todo } from "@/state/atom/todoListAtom";
import { StyleModal, StylePressable, StyleText, StyleView } from "../style";
import { useState } from "react";
import { format } from "date-fns";
import { MarkTodoState } from "./MarkTodo";

export function TodoCard({ todo }: { todo: Todo }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <StyleView className="border-2 rounded-2xl border-gray-500 m-2 mx-3 px-3 py-2">
        <StylePressable onPress={() => setIsOpen(true)}>
          <StyleView className="flex flex-row">
            <StyleView className="flex-shrink-0 mr-2 mt-1">
              <MarkTodoState todo={todo} />
            </StyleView>
            <StyleView className="flex-1">
              <StyleText
                className={
                  "text-base flex-wrap " + (todo.completed && "line-through")
                }
              >
                {todo.title}
              </StyleText>
            </StyleView>
          </StyleView>
        </StylePressable>
      </StyleView>
      <StyleModal animationType="slide" visible={isOpen}>
        <StyleView className="flex flex-1 items-center justify-center m-3">
          <StyleView className="border-2 w-full p-3 rounded-xl">
            <StyleText className="text-xl font-bold text-center">
              Todo
            </StyleText>
            <StyleView className="w-full gap-2">
              <StyleView className="flex flex-row justify-between">
                <StyleView className="gap-2 flex flex-row items-center">
                  <StyleView>
                    <MarkTodoState todo={todo} />
                  </StyleView>
                  <StyleText
                    className={`${todo.completed ? "line-through" : null} text-wrap`}
                  >
                    {todo.title}
                  </StyleText>
                </StyleView>
                {todo.deadline && (
                  <StyleText>{format(todo.deadline, "PPP")}</StyleText>
                )}
              </StyleView>
              <StyleText className="text-wrap">{todo.description}</StyleText>
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
