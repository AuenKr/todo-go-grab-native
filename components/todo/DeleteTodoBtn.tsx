import { Todo, todoListAtom } from "@/state/atom/todoListAtom";
import { useSetRecoilState } from "recoil";
import { StylePressable, StyleView } from "../style";
import { Trash2 } from "lucide-react-native";

export function DeleteTodoButton({ todo }: { todo: Todo }) {
  const setTodoState = useSetRecoilState(todoListAtom);

  const onClickHandler = async () => {
    setTodoState((prev) => {
      const allTodo = prev.filter((each) => {
        if (each.id === todo.id) return false;
        return true;
      });

      return allTodo;
    });

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/mobile/todo`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      }
    );
    const result = await response.json();
    console.log("Result : ", result);
  };

  return (
    <StylePressable onPress={onClickHandler}>
      <StyleView className="h-auto w-auto">
        <Trash2 size={24} color="red" />
      </StyleView>
    </StylePressable>
  );
}
