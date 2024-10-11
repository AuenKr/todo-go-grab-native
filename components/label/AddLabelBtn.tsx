import { todoLabelAtom } from "@/state/atom/todoLabelAtom";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import {
  StyleInput,
  StyleModal,
  StylePressable,
  StyleText,
  StyleView,
} from "../style";
import { Plus, X } from "lucide-react-native";

export function CreateLabel() {
  const [newLabel, setNewLabel] = useState<string>("");
  const setLabel = useSetRecoilState(todoLabelAtom);
  const [dialogState, setDialogState] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const addLabel = async () => {
    if (newLabel.trim() !== "") {
      const tempLabel = {
        id: Math.floor(100000 * Math.random() + 100000),
        name: newLabel,
        userId: null,
      };

      setLabel((prev) => [...prev, tempLabel]);
      setDialogState(false);

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/mobile/todo/label`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newLabel,
          }),
        }
      );

      const result = await response.json();

      if (result) {
        setLabel((prev) => {
          const filterLabel = prev.filter((each) => each.id != tempLabel.id);
          return [...filterLabel, result];
        });
        setNewLabel("");
      }
    } else setError(true);
  };

  return (
    <>
      <StylePressable
        onPress={() => setDialogState(true)}
        className="mx-2 p-2 flex flex-row justify-center items-center border-2 rounded-xl space-x-2 bg-black"
      >
        <StyleView className="rounded-sm">
          <Plus size={24} color="white" />
        </StyleView>
        <StyleText className="text-white font-bold">Label</StyleText>
      </StylePressable>
      <StyleModal animationType="slide" visible={dialogState}>
        <StyleView className="flex flex-1 justify-center">
          <StyleText className="text-2xl font-bold text-center">
            Add Label
          </StyleText>
          <StyleView className="border-2 m-3 p-2 rounded-xl space-y-2">
            <StyleView className="gap-2">
              <StyleView className="flex flex-row justify-between">
                <StyleText className="text-xl font-bold">Title</StyleText>
                <StylePressable onPress={() => setDialogState(false)}>
                  <StyleView className="bg-black rounded-xl">
                    <X size={28} color="white" />
                  </StyleView>
                </StylePressable>
              </StyleView>
              <StyleInput
                value={newLabel}
                onChangeText={setNewLabel}
                className="border-2 rounded-lg px-3 mx-2 border-gray-500"
              />
            </StyleView>
            {error && (
              <StyleText className="text-center text-red-500 text-lg font-bold">
                Please write name of label
              </StyleText>
            )}
            <StylePressable className="bg-black rounded-lg" onPress={addLabel}>
              <StyleText className="text-lg text-white text-center font-bold">
                Create Label
              </StyleText>
            </StylePressable>
          </StyleView>
        </StyleView>
      </StyleModal>
    </>
  );
}
