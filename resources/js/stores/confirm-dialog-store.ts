import { create } from 'zustand';
import { ReactNode } from 'react';

export type ConfirmDialogVariant = 'danger' | 'warning' | 'info' | 'default';

export interface ConfirmDialogOptions {
  title?: string;
  description: string;
  content?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmDialogVariant;
  confirmDisabled?: boolean;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
}

interface ConfirmDialogState {
  isOpen: boolean;
  options: ConfirmDialogOptions | null;
  isLoading: boolean;
}

interface ConfirmDialogActions {
  show: (options: ConfirmDialogOptions) => void;
  update: (options: Partial<ConfirmDialogOptions>) => void;
  hide: () => void;
  setLoading: (loading: boolean) => void;
}

type ConfirmDialogStore = ConfirmDialogState & ConfirmDialogActions;

export const useConfirmDialogStore = create<ConfirmDialogStore>((set) => ({
  isOpen: false,
  options: null,
  isLoading: false,

  show: (options) => {
    set({
      isOpen: true,
      options: {
        title: 'Are you sure?',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
        variant: 'default',
        ...options,
      },
      isLoading: false,
    });
  },

  hide: () => {
    set({
      isOpen: false,
      options: null,
      isLoading: false,
    });
  },

  update: (newOptions) => {
    set((state) => ({
      options: state.options ? { ...state.options, ...newOptions } : null,
    }));
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },
}));

// Helper to use outside of React components
export const confirmDialog = {
  show: (options: ConfirmDialogOptions) => useConfirmDialogStore.getState().show(options),
  hide: () => useConfirmDialogStore.getState().hide(),
};
