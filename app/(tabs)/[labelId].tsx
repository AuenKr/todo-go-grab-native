import { StylePressable, StyleText, StyleView } from "@/components/style";
import { TodoCard } from "@/components/todo/TodoCard";
import { useLabel } from "@/hooks/useLabel";
import { useTodoList } from "@/hooks/useTodo";
import { activeLabelAtom } from "@/state/atom/activeLabelAtom";
import { Todo } from "@/state/atom/todoListAtom";
import { useLocalSearchParams } from "expo-router";
import { Plus } from "lucide-react-native";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

export default function TodoList() {
  const { labelId } = useLocalSearchParams();
  const { loading, todoList } = useTodoList();
  const [filterTask, setFilterTask] = useState<Todo[]>([]);
  const activeLabel = useRecoilValue(activeLabelAtom);

  useEffect(() => {
    const data = todoList.filter(
      (each) => each.labelId == (labelId as unknown as number)
    );

    data.sort((a, b) => {
      if (a.completed && !b.completed) return 1;
      if (!a.completed && b.completed) return -1;
      return 0;
    });

    setFilterTask(data);
  }, [todoList, labelId]);

  return (
    <StyleView>
      {loading ? (
        <StyleText>Loading</StyleText>
      ) : (
        <StyleView>
          {activeLabel ? (
            <StyleView className="flex flex-row justify-between mx-4 my-1">
              <StyleView>
                <StyleText className="font-bold text-2xl">
                  {activeLabel.name}
                </StyleText>
              </StyleView>
              <StyleView>
                <StylePressable
                  onPress={() => console.log("Btn Clicked")}
                  className="flex flex-row items-center justify-center space-x-1 rounded-lg bg-black p-2"
                >
                  <StyleView className="flex items-center justify-center">
                    <Plus size={24} color="white" />
                  </StyleView>
                  <StyleText className="text-white text-center">
                    Add Todo
                  </StyleText>
                </StylePressable>
              </StyleView>
            </StyleView>
          ) : null}
          {filterTask.map((each) => (
            <TodoCard key={each.id} todo={each}></TodoCard>
          ))}
        </StyleView>
      )}
    </StyleView>
  );
}
