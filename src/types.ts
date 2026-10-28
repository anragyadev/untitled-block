export interface TaskItem {
  id: string;
  text: string;
  completed: boolean;
  tag?: string;
}

// Alias for backward compatibility
export type FocusTask = TaskItem;

export interface BlockState {
  title: string;
  subtitle: string;
  tasks: TaskItem[];
}
