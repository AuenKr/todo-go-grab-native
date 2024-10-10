import { Todo } from "@/state/atom/todoListAtom";
import { Text, View } from "react-native";

export function TodoCard({ todo }: { todo: Todo }) {
  return (
    <View>
      <Text>{todo.title}</Text>
    </View>
  );
}
