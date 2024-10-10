import { atom } from "recoil";

export const todoLabelAtom = atom<Label[]>({
  key: 'TodoLabel',
  default: [],
});

export interface Label {
  id: number;
  name: string;
  userId: number | null;
}