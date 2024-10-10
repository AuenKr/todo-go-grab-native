import { Todo, todoListAtom } from "@/state/atom/todoListAtom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useTodoList() {
  const [todoList, setTodoList] = useRecoilState(todoListAtom);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function getTodos() {
      const cache: TodoCacheType | null = JSON.parse(await AsyncStorage.getItem("todos") || '{"todos":[]}');
      if (cache) {
        setTodoList(cache.todos);
        setLoading(false);
      }

      fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/mobile/todo`).then(async (response) => {
        const result = await response.json();
        setTodoList(result.data);
        setLoading(false);
        await AsyncStorage.setItem("todos", JSON.stringify({ todos: result.data }))
        return result;
      })
    }
    getTodos();
  }, [])
  return { loading, todoList };
}

interface TodoCacheType {
  todos: Todo[]
}