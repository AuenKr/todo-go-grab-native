import { activeLabelAtom } from "@/state/atom/activeLabelAtom";
import { Todo, todoListAtom } from "@/state/atom/todoListAtom";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { StyleInput, StyleModal, StyleText, StyleView } from "../style";

export function CreateTodo() {
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const activeLabel = useRecoilValue(activeLabelAtom);
  const setTodo = useSetRecoilState(todoListAtom);
  const [dialogState, setDialogState] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>();

  const addTask = async () => {
    if (newTask.trim() !== "" || newDescription.trim() !== "" || activeLabel) {
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
      if (result) {
        setTodo((prev) => {
          const data = prev.filter((each) => each.id != tempTodo.id);
          return [...data, result];
        });

        setNewTask("");
        setNewDescription("");
        return;
      }
    }
  };
  return (
    <StyleModal
      visible={dialogState}
      onAccessibilityTap={() => setDialogState((prev) => !prev)}
    >
      <StyleView>
        <StyleView>
          <StyleText>Title</StyleText>
          <StyleInput value={newTask} onChangeText={setNewTask} />
        </StyleView>
        <StyleView>
          <StyleText>Description</StyleText>
          <StyleInput value={newDescription} onChangeText={setNewDescription} />
        </StyleView>
        <StyleView>
          <StyleText>Deadline</StyleText>
          <StyleInput />
        </StyleView>
      </StyleView>
    </StyleModal>
  );
}
