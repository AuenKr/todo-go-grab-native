import { Todo } from "@/state/atom/todoListAtom";
import { StyleModal, StylePressable, StyleText, StyleView } from "../style";
import { useState } from "react";
import { format } from "date-fns";
import { MarkTodoState } from "./MarkTodo";
import { TodoDetail } from "./TodoDetail";
import { EditTodoBtn } from "./EditTodo";
import { DeleteTodoButton } from "./DeleteTodoBtn";

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
            <StyleView className="flex flex-row items-center space-x-3">
              <StyleView>
                <EditTodoBtn todo={todo} />
              </StyleView>
              <StyleView>
                <DeleteTodoButton todo={todo} />
              </StyleView>
            </StyleView>
          </StyleView>
        </StylePressable>
      </StyleView>
      <StyleModal animationType="slide" visible={isOpen}>
        <TodoDetail setIsOpen={setIsOpen} todo={todo} />
      </StyleModal>
    </>
  );
}
