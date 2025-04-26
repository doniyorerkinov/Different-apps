// src/Interfaces/Kanban.ts
export interface ITRelloColumn {
  columnId: string;
  name: string;
  tasks: ITrelloTask[];
}

export interface ITrelloTask {
  name: string;
  taskId: string;
  description: string;
  columnId: string;
}

export type TransferType = 'column' | 'task';

export interface ITransferData {
  type: TransferType;
  columnId: string;        // Source column ID
  taskId?: string;         // Only for task transfers
  fromIndex?: number;      // Original position
  toColumnId?: string;     // Destination column ID
  toIndex?: number;        // New position in destination
}