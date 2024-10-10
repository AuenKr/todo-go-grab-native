import { useLabel } from "@/hooks/useLabel";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function Labels() {
  const { labels, loading } = useLabel();
  return (
    <SafeAreaView>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <View>
          {labels.map((each) => (
            <View key={each.id}>
              <Text>{each.name}</Text>
            </View>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}
