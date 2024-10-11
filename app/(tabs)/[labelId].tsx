import {
  StyleModal,
  StylePressable,
  StyleScrollView,
  StyleText,
  StyleView,
} from "@/components/style";
import { CreateTodo } from "@/components/todo/CreateTodo";
import { TodoCard } from "@/components/todo/TodoCard";
import { useTodoList } from "@/hooks/useTodo";
import { activeLabelAtom } from "@/state/atom/activeLabelAtom";
import { Todo } from "@/state/atom/todoListAtom";
import { useLocalSearchParams } from "expo-router";
import { Plus } from "lucide-react-native";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function TodoList() {
  const { labelId } = useLocalSearchParams();
  const { loading, todoList } = useTodoList();
  const [filterTask, setFilterTask] = useState<Todo[]>([]);
  const activeLabel = useRecoilValue(activeLabelAtom);
  const [createNew, setCreateNew] = useState<boolean>(false);

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
    <>
      <StyleView className="flex-1">
        {loading ? (
          <StyleView className="flex-1 justify-center items-center">
            <StyleText>Loading</StyleText>
          </StyleView>
        ) : (
          <StyleView className="flex-1">
            {activeLabel ? (
              <StyleView className="flex flex-row justify-between mx-4 my-1">
                <StyleView>
                  <StyleText className="font-bold text-2xl">
                    {activeLabel.name}
                  </StyleText>
                </StyleView>
                <StyleView>
                  <StylePressable
                    onPress={() => setCreateNew(true)}
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
            <StyleScrollView className="flex-1">
              {filterTask.map((each) => (
                <TodoCard key={each.id} todo={each}></TodoCard>
              ))}
            </StyleScrollView>
          </StyleView>
        )}
      </StyleView>
      <StyleModal animationType="slide" visible={createNew}>
        <CreateTodo setDialogState={setCreateNew} />
      </StyleModal>
    </>
  );
}
