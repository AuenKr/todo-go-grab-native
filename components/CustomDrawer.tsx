import { useLabel } from "@/hooks/useLabel";
import { GestureResponderEvent, Pressable, Text, View } from "react-native";
import { StyleSafeAreaView, StyleText, StyleView } from "./style";
import { router } from "expo-router";
import { useRecoilState } from "recoil";
import { activeLabelAtom } from "@/state/atom/activeLabelAtom";

export default function Drawer() {
  const { labels, loading } = useLabel();
  const [activeLabel, setActiveLabel] = useRecoilState(activeLabelAtom);

  return (
    <StyleSafeAreaView className="mt-[40px]">
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <StyleView className="m-1 space-y-3 flex justify-center">
          {labels.map((each) => (
            <Pressable
              key={each.id}
              onPress={() => {
                setActiveLabel(each);
                router.push(`/${each.id}`);
              }}
            >
              <StyleText className="text-xl font-bold text-center border-2 rounded-lg mx-2">
                {each.name}
              </StyleText>
            </Pressable>
          ))}
        </StyleView>
      )}
    </StyleSafeAreaView>
  );
}
