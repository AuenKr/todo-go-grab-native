import { StyleView } from "@/components/style";
import { activeLabelAtom } from "@/state/atom/activeLabelAtom";
import { ActivityIndicator } from "react-native";
import { useRecoilValue } from "recoil";

export default function Inbox() {
  const activeLabel = useRecoilValue(activeLabelAtom);

  return (
    <StyleView className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#0000ff" />
    </StyleView>
  );
}
