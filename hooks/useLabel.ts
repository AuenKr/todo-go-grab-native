import { activeLabelAtom } from "@/state/atom/activeLabelAtom";
import { Label, todoLabelAtom } from "@/state/atom/todoLabelAtom";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useLabel() {
  const [labels, setLabels] = useRecoilState(todoLabelAtom);
  const [loading, setLoading] = useState<boolean>(true);
  const setActiveLabel = useSetRecoilState(activeLabelAtom);
  useEffect(() => {
    async function getLabels() {
      const cache: LabelCacheType | null = JSON.parse(await AsyncStorage.getItem('labels') || '{"labels":[]}');
      if (cache) {
        setLabels(cache.labels);
        setLoading(false);
        setActiveLabel(cache.labels[0]);
      }

      fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/mobile/todo/label`).then(async (response) => {
        const result = await response.json();
        setLabels(result.data)
        setLoading(false);
        setActiveLabel(result[0]);
        await AsyncStorage.setItem('labels', JSON.stringify({ labels: result.data }));
        return result;
      })
    }

    getLabels();
  }, [])
  return { loading, labels };
}

interface LabelCacheType {
  labels: Label[]
}