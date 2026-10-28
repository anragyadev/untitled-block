import React from 'react';
import { defineBlock, useOrbixState } from '@orbixdocs/sdk';
import { WelcomeCard } from './components/WelcomeCard';
import { BlockState } from './types';
import './styles.css';

export function CustomBlock(props: any) {
  const [state, setState] = useOrbixState<BlockState>(props, {
    title: 'Untitled Block',
    subtitle: 'Interactive custom block built with the Orbix Block SDK',
    tasks: [
      { id: '1', text: 'Send a prompt in AI Copilot to generate or refine features', completed: false, tag: 'AI' },
      { id: '2', text: 'Tweak something in the code editor (e.g. change titles or styles)', completed: false, tag: 'Code' },
      { id: '3', text: 'Toggle between Desktop, Tablet, and Mobile device previews above', completed: false, tag: 'Preview' },
      { id: '4', text: 'Test live interactive state by adding or checking off items', completed: false, tag: 'State' },
      { id: '5', text: 'Click "Publish" in the topbar to deploy your custom block', completed: false, tag: 'Deploy' }
    ]
  });

  return (
    <WelcomeCard
      state={state}
      onToggleTask={(id) => {
        setState(prev => ({
          ...prev,
          tasks: (prev.tasks || []).map(t => t.id === id ? { ...t, completed: !t.completed } : t)
        }));
      }}
      onAddTask={(text) => {
        if (!text.trim()) return;
        setState(prev => ({
          ...prev,
          tasks: [...(prev.tasks || []), { id: 'task_' + Date.now(), text: text.trim(), completed: false, tag: 'Task' }]
        }));
      }}
      onDeleteTask={(id) => {
        setState(prev => ({
          ...prev,
          tasks: (prev.tasks || []).filter(t => t.id !== id)
        }));
      }}
      onClearCompleted={() => {
        setState(prev => ({
          ...prev,
          tasks: (prev.tasks || []).filter(t => !t.completed)
        }));
      }}
      onResetTasks={() => {
        setState(prev => ({
          ...prev,
          tasks: [
            { id: '1', text: 'Send a prompt in AI Copilot to generate or refine features', completed: false, tag: 'AI' },
            { id: '2', text: 'Tweak something in the code editor (e.g. change titles or styles)', completed: false, tag: 'Code' },
            { id: '3', text: 'Toggle between Desktop, Tablet, and Mobile device previews above', completed: false, tag: 'Preview' },
            { id: '4', text: 'Test live interactive state by adding or checking off items', completed: false, tag: 'State' },
            { id: '5', text: 'Click "Publish" in the topbar to deploy your custom block', completed: false, tag: 'Deploy' }
          ]
        }));
      }}
    />
  );
}

export default defineBlock({
  manifest: {
    id: 'custom-untitled-block-1793155692278',
    name: 'Untitled Block',
    version: '1.0.0',
    category: 'Widgets',
    themeMode: 'adaptive',
    description: 'Interactive custom block built with the Orbix Block SDK',
    icon: 'blocks',
    surfaces: ['block', 'fullpage', 'sidebar_panel']
  },
  capabilities: ['storage'],
  component: CustomBlock
});
