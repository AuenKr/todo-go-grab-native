import { useLabel } from "@/hooks/useLabel";
import { Pressable, Text, View } from "react-native";
import { StyleSafeAreaView, StyleText, StyleView } from "./style";
import { router } from "expo-router";

export default function Drawer() {
  const { labels, loading } = useLabel();
  return (
    <StyleSafeAreaView className="mt-[40px] bg-red-500">
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <StyleView className="m-1 space-y-2">
          {labels.map((each) => (
            <Pressable
              key={each.id}
              onPress={() => router.push(`/${each.id}`)}
            >
              <StyleText className="text-xl font-bold">{each.name}</StyleText>
            </Pressable>
          ))}
        </StyleView>
      )}
    </StyleSafeAreaView>
  );
}
