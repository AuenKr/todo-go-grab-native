import { Todo } from "@/state/atom/todoListAtom";
import { StylePressable, StyleText, StyleView } from "../style";
import { MarkTodoState } from "./MarkTodo";
import { format } from "date-fns";
import { Dispatch, SetStateAction, useState } from "react";
import { EditTodoBtn } from "./EditTodo";
import { DeleteTodoButton } from "./DeleteTodoBtn";

export function TodoDetail({
  todo,
  setIsOpen,
}: {
  todo: Todo;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <StyleView className="flex flex-1 items-center justify-center m-3">
      <StyleView className="border-2 w-full p-3 rounded-xl">
        <StyleText className="text-xl font-bold text-center">Todo</StyleText>
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
            <StyleView className="flex flex-row gap-2 items-center">
              <StyleView>
                {todo.deadline && (
                  <StyleText>{format(todo.deadline, "PPP")}</StyleText>
                )}
              </StyleView>
              <StyleView className="flex flex-row space-x-1">
                <StyleView>
                  <EditTodoBtn todo={todo} />
                </StyleView>
                <StyleView>
                  <DeleteTodoButton todo={todo} />
                </StyleView>
              </StyleView>
            </StyleView>
          </StyleView>
          <StyleText className="text-wrap">{todo.description}</StyleText>
          <StylePressable onPress={() => setIsOpen(false)}>
            <StyleText className="text-white bg-black text-center p-2 my-2 rounded-lg">
              Close
            </StyleText>
          </StylePressable>
        </StyleView>
      </StyleView>
    </StyleView>
  );
}
