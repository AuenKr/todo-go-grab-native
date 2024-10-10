import { atom } from "recoil";

export const todoListAtom = atom<Todo[]>({
  key: 'TodoList',
  default: [],
});

export interface Todo {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  deadline: Date | null;
  labelId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}