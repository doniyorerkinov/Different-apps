// src/store/trello.ts
import { ITRelloColumn, ITrelloTask, ITransferData } from '../Interfaces/Kanban';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTrelloStore = defineStore('trello', () => {
  const columns = ref<ITRelloColumn[]>([
    {
      columnId: '1',
      name: 'To Do',
      tasks: [
        {
          taskId: '1',
          name: 'Task 1',
          description: 'Description for task 1',
          columnId: '1'
        }
      ]
    },
    {
      columnId: '2',
      name: 'In Progress',
      tasks: []
    },
    {
      columnId: '3',
      name: 'Done',
      tasks: []
    }
  ]);

  // Generate a simple ID
  function generateId() {
    return Date.now().toString();
  }

  // Column actions
  function addColumn(name: string) {
    columns.value.push({
      columnId: generateId(),
      name,
      tasks: []
    });
  }

  function moveColumn(fromIndex: number, toIndex: number) {
    if (fromIndex === toIndex) return;
    
    const columnToMove = columns.value.splice(fromIndex, 1)[0];
    columns.value.splice(toIndex, 0, columnToMove);
  }

  function deleteColumn(columnId: string) {
    columns.value = columns.value.filter(col => col.columnId !== columnId);
  }

  // Task actions
  function addTask(task: Omit<ITrelloTask, 'taskId'>) {
    const column = columns.value.find(col => col.columnId === task.columnId);
    if (column) {
      column.tasks.push({
        ...task,
        taskId: generateId()
      });
    }
  }

  function moveTask(transferData: ITransferData) {
    if (!transferData.taskId) return;

    // Find source column and task
    const sourceColumn = columns.value.find(col => col.columnId === transferData.columnId);
    if (!sourceColumn) return;

    const taskIndex = transferData.fromIndex ?? 
      sourceColumn.tasks.findIndex(t => t.taskId === transferData.taskId);
    if (taskIndex === -1) return;

    const [task] = sourceColumn.tasks.splice(taskIndex, 1);
    
    // Determine destination column (default to source if not specified)
    const destinationColumnId = transferData.toColumnId || transferData.columnId;
    const destColumn = columns.value.find(col => col.columnId === destinationColumnId);
    if (!destColumn) return;

    // Update task's columnId if moving to different column
    if (transferData.toColumnId) {
      task.columnId = transferData.toColumnId;
    }

    // Insert at specified position or at the end
    const insertAt = transferData.toIndex ?? destColumn.tasks.length;
    destColumn.tasks.splice(insertAt, 0, task);
  }

  function deleteTask(taskId: string) {
    for (const column of columns.value) {
      const index = column.tasks.findIndex(t => t.taskId === taskId);
      if (index !== -1) {
        column.tasks.splice(index, 1);
        break;
      }
    }
  }

  return { 
    columns,
    addColumn,
    moveColumn,
    deleteColumn,
    addTask,
    moveTask,
    deleteTask
  };
}, {
  persist: true,
});