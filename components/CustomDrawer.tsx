import { useLabel } from "@/hooks/useLabel";
import { GestureResponderEvent, Pressable, Text, View } from "react-native";
import {
  StylePressable,
  StyleSafeAreaView,
  StyleScrollView,
  StyleText,
  StyleView,
} from "./style";
import { router } from "expo-router";
import { useSetRecoilState } from "recoil";
import { activeLabelAtom } from "@/state/atom/activeLabelAtom";
import { CreateLabel } from "./label/AddLabelBtn";
import { useState } from "react";
import { Edit } from "lucide-react-native";
import { EditLabel } from "./label/EditLabelBtn";
import { DeleteLabelButton } from "./label/DeleteLabelBtn";

export default function Drawer() {
  const { labels, loading } = useLabel();
  const setActiveLabel = useSetRecoilState(activeLabelAtom);
  const [editMode, setEditMode] = useState<boolean>(false);

  return (
    <StyleSafeAreaView className="flex-1 mt-[40px]">
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <StyleView className="flex-1 flex justify-between">
          <StyleScrollView className="flex-1">
            <StyleView className="m-1 space-y-3 flex justify-center">
              {labels.map((each) => (
                <StylePressable
                  key={each.id}
                  onPress={() => {
                    setActiveLabel(each);
                    router.push(`/${each.id}`);
                  }}
                  className={`border-2 rounded-lg mx-2 px-2 p-1 flex flex-row ${editMode ? "justify-between" : "justify-center"}`}
                >
                  <StyleText className="text-xl font-bold text-center">
                    {each.name}
                  </StyleText>
                  {editMode && (
                    <StyleView className="flex flex-row space-x-2">
                      <StyleView>
                        <EditLabel label={each} />
                      </StyleView>
                      <StyleView>
                        <DeleteLabelButton label={each} />
                      </StyleView>
                    </StyleView>
                  )}
                </StylePressable>
              ))}
            </StyleView>
          </StyleScrollView>
          <StyleView>
            <StyleView>
              <CreateLabel />
            </StyleView>
            <StylePressable
              className="m-2 p-2 flex flex-row justify-center items-center border-2 rounded-xl space-x-2 bg-black"
              onPress={() => setEditMode((prev) => !prev)}
            >
              <StyleView className="rounded-sm">
                <Edit size={24} color="white" />
              </StyleView>
              <StyleText className="text-white font-bold">Edit Label</StyleText>
            </StylePressable>
          </StyleView>
        </StyleView>
      )}
    </StyleSafeAreaView>
  );
}
