export interface AddActivityModalProps {
    isOpen: boolean;
    onConfirm: (activityName: string, maxProgress: number) => void;
    onCancel: () => void;
    isLoading: boolean;
}
