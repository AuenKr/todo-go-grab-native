import { TodoCard } from "@/components/todo/TodoCard";
import { useTodoList } from "@/hooks/useTodo";
import { SafeAreaView, Text, View } from "react-native";

export default function Todo() {
  const { loading, todoList } = useTodoList();
  return (
    <SafeAreaView>
      <Text>On Todo Page</Text>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <View>
          {todoList.map((each) => (
            <TodoCard key={each.id} todo={each}></TodoCard>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}
