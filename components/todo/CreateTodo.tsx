import { activeLabelAtom } from "@/state/atom/activeLabelAtom";
import { Todo, todoListAtom } from "@/state/atom/todoListAtom";
import { Dispatch, SetStateAction, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  StyleButton,
  StyleInput,
  StylePressable,
  StyleText,
  StyleView,
} from "../style";
import { X } from "lucide-react-native";
import { DatePickerBtn } from "../DatePicker";

export function CreateTodo({
  setDialogState,
}: {
  setDialogState: Dispatch<SetStateAction<boolean>>;
}) {
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const activeLabel = useRecoilValue(activeLabelAtom);
  const setTodo = useSetRecoilState(todoListAtom);
  const [date, setDate] = useState<Date>(new Date());
  const [error, setError] = useState<boolean>(false);

  const addTask = async () => {
    if (newTask.trim() !== "" || newDescription.trim() !== "" || !activeLabel) {
      const labelId = activeLabel?.id as unknown as number;
      const tempTodo: Todo = {
        id: Math.floor(100000 * Math.random() + 1000000),
        completed: false,
        description: newDescription,
        title: newTask,
        labelId: activeLabel.id,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deadline: date || null,
      };
      setTodo((prev) => {
        return [...prev, tempTodo];
      });
      setDialogState(false);

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/mobile/todo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newTask,
            labelId: activeLabel.id,
            description: newDescription,
            deadline: date,
          }),
        }
      );
      const result = await response.json();
      console.log("Created todo : ", result);
      if (result) {
        setTodo((prev) => {
          const data = prev.filter((each) => each.id != tempTodo.id);
          return [...data, result];
        });

        setNewTask("");
        setNewDescription("");
        return;
      }
    } else {
      setError(true);
    }
  };
  return (
    <StyleView className="flex flex-1 justify-center">
      <StyleView className="border-2 m-3 p-2 rounded-xl space-y-2">
        <StyleView className="gap-2">
          <StyleView className="flex flex-row justify-between">
            <StyleText className="text-xl font-bold">Title</StyleText>
            <StylePressable onPress={() => setDialogState((prev) => !prev)}>
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
        <StylePressable className="bg-black rounded-lg" onPress={addTask}>
          <StyleText className="text-lg text-white text-center font-bold">
            Add Todo
          </StyleText>
        </StylePressable>
      </StyleView>
    </StyleView>
  );
}
