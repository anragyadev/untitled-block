import React, { useState } from 'react';
import { Check, Plus, Trash2, CheckCircle, RotateCcw, Layers } from 'lucide-react';
import { BlockState, TaskItem } from '../types';

interface WelcomeCardProps {
  state: BlockState;
  onToggleTask: (id: string) => void;
  onAddTask: (text: string) => void;
  onDeleteTask: (id: string) => void;
  onClearCompleted?: () => void;
  onResetTasks?: () => void;
}

export function WelcomeCard({
  state,
  onToggleTask,
  onAddTask,
  onDeleteTask,
  onClearCompleted,
  onResetTasks
}: WelcomeCardProps) {
  const [newTaskText, setNewTaskText] = useState('');

  const completedCount = (state.tasks || []).filter(t => t.completed).length;
  const totalCount = (state.tasks || []).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const remainingCount = totalCount - completedCount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    onAddTask(newTaskText.trim());
    setNewTaskText('');
  };

  return (
    <div className="w-full p-5 sm:p-7 rounded-2xl bg-white dark:bg-neutral-900/80 border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.5),0_6px_20px_rgba(0,0,0,0.25)] backdrop-blur-xl font-sans text-neutral-900 dark:text-neutral-100 transition-all select-none space-y-5">
      
      {/* 1. Header Row */}
      <header className="flex items-start sm:items-center justify-between gap-4 pb-1">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center text-neutral-800 dark:text-neutral-200 shrink-0 shadow-2xs">
            <Layers size={18} strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-semibold tracking-tight text-neutral-950 dark:text-white truncate">
              {state.title || 'Untitled Block'}
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-normal truncate mt-0.5">
              {state.subtitle || 'Block Studio Quickstart • Interactive onboarding tasks'}
            </p>
          </div>
        </div>

        {/* Status Pill Badge */}
        <div className="shrink-0 flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] text-neutral-600 dark:text-neutral-300">
            <span className={`w-1.5 h-1.5 rounded-full ${completedCount === totalCount && totalCount > 0 ? 'bg-neutral-900 dark:bg-white' : 'bg-neutral-400 dark:bg-neutral-500'}`} />
            <span>{completedCount} of {totalCount} completed</span>
          </span>
        </div>
      </header>

      {/* 2. Hairline Progress Bar */}
      <div className="w-full bg-black/[0.04] dark:bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
        <div 
          className="bg-neutral-950 dark:bg-white h-full rounded-full transition-all duration-300 ease-out" 
          style={{ width: `${progressPercent}%` }} 
        />
      </div>

      {/* 3. Task Items List */}
      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-0.5">
        {(state.tasks || []).length === 0 ? (
          <div className="py-8 text-center space-y-1.5 text-neutral-400 dark:text-neutral-500">
            <CheckCircle size={24} className="mx-auto stroke-[1.5] opacity-40 mb-1" />
            <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400">All caught up — no tasks in this block.</p>
            <p className="text-[11px] opacity-70">Add a new item below to get started.</p>
          </div>
        ) : (
          state.tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onToggleTask(task.id)}
              className={`group flex items-center justify-between p-3 rounded-xl transition-all duration-150 cursor-pointer select-none active:scale-[0.995] ${
                task.completed
                  ? 'bg-black/[0.015] dark:bg-white/[0.02] text-neutral-400 dark:text-neutral-500 border border-black/[0.03] dark:border-white/[0.04]'
                  : 'bg-black/[0.025] hover:bg-black/[0.04] dark:bg-white/[0.035] dark:hover:bg-white/[0.05] text-neutral-900 dark:text-neutral-100 border border-black/[0.05] dark:border-white/[0.06]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-[18px] h-[18px] rounded-md flex items-center justify-center transition-all duration-150 shrink-0 ${
                  task.completed
                    ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-2xs'
                    : 'border-2 border-neutral-300 dark:border-white/20 group-hover:border-neutral-500 dark:group-hover:border-white/40'
                }`}>
                  {task.completed && <Check size={11} strokeWidth={3} />}
                </div>
                <span className={`text-xs sm:text-sm truncate transition-all duration-150 ${
                  task.completed ? 'line-through opacity-60 font-normal' : 'font-medium'
                }`}>
                  {task.text}
                </span>
                {task.tag && (
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-md text-[10px] font-mono tracking-tight bg-black/[0.03] dark:bg-white/[0.05] text-neutral-500 dark:text-neutral-400 border border-black/[0.04] dark:border-white/[0.06]">
                    {task.tag}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteTask(task.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-black/[0.06] dark:hover:bg-white/[0.08] text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-all cursor-pointer"
                title="Delete item"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* 4. Quick Add Form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add a new task or note..."
          className="flex-1 bg-black/[0.025] dark:bg-white/[0.035] border border-black/[0.06] dark:border-white/[0.08] focus:border-neutral-400 dark:focus:border-white/30 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none transition-all"
        />
        <button
          type="submit"
          disabled={!newTaskText.trim()}
          className="px-3.5 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-900 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950 disabled:opacity-25 disabled:cursor-not-allowed text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 active:scale-95 cursor-pointer shrink-0 shadow-2xs border border-neutral-900/10 dark:border-white/90"
        >
          <Plus size={14} />
          <span>Add</span>
        </button>
      </form>

      {/* 5. Minimalist Footer */}
      <footer className="pt-2 border-t border-black/[0.04] dark:border-white/[0.05] flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500 font-mono select-none">
        <div className="flex items-center gap-2">
          <span>Orbix Block SDK</span>
          <span>•</span>
          <span>{remainingCount} pending</span>
        </div>

        <div className="flex items-center gap-3">
          {completedCount > 0 && onClearCompleted && (
            <button
              type="button"
              onClick={onClearCompleted}
              className="text-[11px] font-sans font-medium text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors cursor-pointer"
            >
              Clear completed
            </button>
          )}
          {onResetTasks && (
            <button
              type="button"
              onClick={onResetTasks}
              className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors cursor-pointer"
              title="Reset default items"
            >
              <RotateCcw size={12} />
            </button>
          )}
        </div>
      </footer>

    </div>
  );
}
