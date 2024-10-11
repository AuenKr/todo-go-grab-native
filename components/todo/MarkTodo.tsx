import { Todo, todoListAtom } from "@/state/atom/todoListAtom";
import { useSetRecoilState } from "recoil";
import { StylePressable, StyleView } from "../style";
import { Check, CheckCheckIcon, Circle } from "lucide-react-native";

export function MarkTodoState({ todo }: { todo: Todo }) {
  const setTodoState = useSetRecoilState(todoListAtom);

  const onClickHandler = async () => {
    const tempTodo: Todo = { ...todo, completed: !todo.completed };
    setTodoState((prev) => {
      const allTodo = prev.map((each) => {
        if (each.id === todo.id) return tempTodo;
        return each;
      });
      return allTodo;
    });

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/mobile/todo`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      }
    );
    const result = await response.json();
    console.log("Result : ", result, todo);

    setTodoState((prev) => {
      const allTodo = prev.map((each) => {
        if (each.id === todo.id)
          return { ...each, completed: result.result as boolean };
        return each;
      });
      return allTodo;
    });
  };

  return (
    <StylePressable onPress={onClickHandler}>
      <StyleView className="h-auto w-auto">
        {todo.completed ? (
          <CheckCheckIcon size={20} color="black" />
        ) : (
          <Circle size={20} color="black" />
        )}
      </StyleView>
    </StylePressable>
  );
}
