import { Label, todoLabelAtom } from "@/state/atom/todoLabelAtom";
import { useSetRecoilState } from "recoil";
import { StylePressable, StyleView } from "../style";
import { Trash2 } from "lucide-react-native";

export function DeleteLabelButton({ label }: { label: Label }) {
  const setLabelState = useSetRecoilState(todoLabelAtom);

  const onClickHandler = async () => {
    setLabelState((prev) => {
      const allLabel = prev.filter((each) => {
        if (each.id === label.id) return false;
        return true;
      });

      return allLabel;
    });

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/mobile/todo/label`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(label),
      }
    );
    await response.json();
  };

  return (
    <StylePressable onPress={onClickHandler}>
      <StyleView className="h-auto w-auto">
        <Trash2 size={24} color="red" />
      </StyleView>
    </StylePressable>
  );
}
