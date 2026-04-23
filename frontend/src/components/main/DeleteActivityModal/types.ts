export interface DeleteActivityModalProps {
    isOpen: boolean;
    activityName: string;
    onConfirm: () => void;
    onCancel: () => void;
}
