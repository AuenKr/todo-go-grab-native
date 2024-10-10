import { StyleText, StyleView } from "@/components/style";
import { TodoCard } from "@/components/todo/TodoCard";
import { useTodoList } from "@/hooks/useTodo";
import { activeLabelAtom } from "@/state/atom/activeLabelAtom";
import { Todo } from "@/state/atom/todoListAtom";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function TodoList() {
  const { label } = useLocalSearchParams();
  const { loading, todoList } = useTodoList();
  const [filterTask, setFilterTask] = useState<Todo[]>([]);
  const activeLabel = useRecoilValue(activeLabelAtom);

  useEffect(() => {
    const data = todoList.filter(
      (each) => each.labelId == (label as unknown as number)
    );

    data.sort((a, b) => {
      if (a.completed && !b.completed) return 1;
      if (!a.completed && b.completed) return -1;
      return 0;
    });

    setFilterTask(data);
  }, [todoList, activeLabel]);

  return (
    <StyleView>
      {loading ? (
        <StyleText>Loading</StyleText>
      ) : (
        <StyleView>
          {filterTask.map((each) => (
            <TodoCard key={each.id} todo={each}></TodoCard>
          ))}
        </StyleView>
      )}
    </StyleView>
  );
}
