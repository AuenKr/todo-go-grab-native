import { Label, todoLabelAtom } from "@/state/atom/todoLabelAtom";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import {
  StyleInput,
  StyleModal,
  StylePressable,
  StyleText,
  StyleView,
} from "../style";
import { Edit, X } from "lucide-react-native";

export function EditLabel({ label }: { label: Label }) {
  const [newLabel, setNewLabel] = useState<string>(label.name);
  const setLabel = useSetRecoilState(todoLabelAtom);
  const [dialogState, setDialogState] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const editLabel = async () => {
    if (newLabel.trim() !== "") {
      setLabel((prev) => {
        const labels = prev.map((each) => {
          if (each.id === label.id) return { ...each, name: newLabel };
          return each;
        });
        return labels;
      });

      setDialogState(false);

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/mobile/todo/label`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: label.id,
            name: newLabel,
          }),
        }
      );

      const result = await response.json();

      if (result) {
        setNewLabel("");
        return;
      }
    } else {
      setError(true);
    }
  };

  return (
    <>
      <StylePressable onPress={() => setDialogState(true)}>
        <StyleView className="bg-gray-700 rounded-sm">
          <Edit size={24} color="white" />
        </StyleView>
      </StylePressable>
      <StyleModal animationType="slide" visible={dialogState}>
        <StyleView className="flex flex-1 justify-center">
          <StyleText className="text-2xl font-bold text-center">
            Edit Label
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
                Please Fill Label Name
              </StyleText>
            )}
            <StylePressable className="bg-black rounded-lg" onPress={editLabel}>
              <StyleText className="text-lg text-white text-center font-bold">
                Update Label
              </StyleText>
            </StylePressable>
          </StyleView>
        </StyleView>
      </StyleModal>
    </>
  );
}
