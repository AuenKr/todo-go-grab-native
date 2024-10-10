import { atom } from "recoil";
import { Label } from "./todoLabelAtom";

export const activeLabelAtom = atom<Label>({
  key: "ActiveLabel",
  default: {
    id: 1000000,
    name: "Inbox",
    userId: null
  }
})