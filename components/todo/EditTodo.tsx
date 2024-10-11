import { activeLabelAtom } from "@/state/atom/activeLabelAtom";
import { Todo, todoListAtom } from "@/state/atom/todoListAtom";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  StyleInput,
  StyleModal,
  StylePressable,
  StyleText,
  StyleView,
} from "../style";
import { Edit, X } from "lucide-react-native";
import { DatePickerBtn } from "../DatePicker";

export function EditTodoBtn({ todo }: { todo: Todo }) {
  const [newTask, setNewTask] = useState(todo.title);
  const [newDescription, setNewDescription] = useState<string>(
    todo.description || ""
  );
  const activeLabel = useRecoilValue(activeLabelAtom);
  const setTodo = useSetRecoilState(todoListAtom);
  const [date, setDate] = useState<Date>(new Date(todo.deadline || Date.now()));
  const [error, setError] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const EditTask = async () => {
    if (newTask.trim() !== "" || newDescription.trim() !== "" || !activeLabel) {
      const tempTodo: Todo = {
        ...todo,
        title: newTask,
        description: newDescription,
        deadline: date || null,
      };

      setTodo((prev) => {
        const data = prev.map((each) => {
          if (each.id === tempTodo.id) return tempTodo;
          return each;
        });
        return data;
      });

      setIsModalVisible(false);

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/mobile/todo`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: todo.id,
            title: newTask,
            labelId: activeLabel.id,
            description: newDescription,
            deadline: date,
          }),
        }
      );

      const result = await response.json();

      if (result) {
        setNewTask("");
        setNewDescription("");
        return;
      }
    } else {
      setError(true);
    }
  };

  return (
    <>
      <StylePressable onPress={() => setIsModalVisible(true)}>
        <StyleView className="bg-gray-700 rounded-sm">
          <Edit size={24} color="white" />
        </StyleView>
      </StylePressable>
      <StyleModal animationType="slide" visible={isModalVisible}>
        <StyleView className="flex flex-1 justify-center">
          <StyleText className="text-2xl font-bold text-center">
            Edit Todo - {activeLabel.name}
          </StyleText>
          <StyleView className="border-2 m-3 p-2 rounded-xl space-y-2">
            <StyleView className="gap-2">
              <StyleView className="flex flex-row justify-between">
                <StyleText className="text-xl font-bold">Title</StyleText>
                <StylePressable onPress={() => setIsModalVisible(false)}>
                  <StyleView className="bg-black rounded-xl">
                    <X size={28} color="white" />
                  </StyleView>
                </StylePressable>
              </StyleView>
              <StyleInput
                value={newTask}
                onChangeText={setNewTask}
                className="border-2 rounded-lg px-3 mx-2 border-gray-500"
              />
            </StyleView>
            <StyleView className="gap-2">
              <StyleText className="text-xl font-bold">Description</StyleText>
              <StyleInput
                value={newDescription}
                onChangeText={setNewDescription}
                className="border-2 rounded-lg px-3 mx-2 border-gray-500"
              />
            </StyleView>
            <StyleView>
              <StyleText className="text-lg font-bold">Deadline</StyleText>
              <DatePickerBtn date={date} setDate={setDate} />
            </StyleView>
            {error && (
              <StyleText className="text-center text-red-500 text-lg font-bold">
                Please fill All values
              </StyleText>
            )}
            <StylePressable className="bg-black rounded-lg" onPress={EditTask}>
              <StyleText className="text-lg text-white text-center font-bold">
                Update Todo
              </StyleText>
            </StylePressable>
          </StyleView>
        </StyleView>
      </StyleModal>
    </>
  );
}
