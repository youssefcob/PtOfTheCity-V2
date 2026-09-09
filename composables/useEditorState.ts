import type { EditableTag, LinkTarget } from '~/types/content';

export interface ActiveTextField {
  kind: 'text';
  key: string;
  page: string;
  el: HTMLElement;
  tag: EditableTag;
  textStyleId: number | null;
  href: string;
  target: LinkTarget;
  setTag: (tag: EditableTag) => void;
  setTextStyleId: (id: number | null) => void;
  setHref: (href: string) => void;
  setTarget: (target: LinkTarget) => void;
}

export interface ActiveImageField {
  kind: 'image';
  key: string;
  page: string;
  el: HTMLElement;
  objectFit: string;
  objectPosition: string;
  alt: string;
  uploading: boolean;
  triggerFilePicker: () => void;
  setObjectFit: (fit: string) => void;
  setObjectPosition: (pos: string) => void;
  setAlt: (alt: string) => void;
}

export type ActiveEditableField = ActiveTextField | ActiveImageField;

// Module-level (per-request via useState) UI state for the admin editing
// experience: whether edit mode is on, and which single field currently owns
// the floating StyleToolbarHost. Framework-agnostic interaction loop, just
// the data source changed from Inertia shared props to our own API fetch.
export const useEditorState = () => {
  const editModeEnabled = useState<boolean>('cms-edit-mode-enabled', () => false);
  const activeEditableField = useState<ActiveEditableField | null>('cms-active-editable-field', () => null);

  const setEditMode = (value: boolean) => {
    editModeEnabled.value = value;
    if (!value) activeEditableField.value = null;
  };

  const toggleEditMode = () => {
    setEditMode(!editModeEnabled.value);
  };

  const setActiveEditableField = (field: ActiveEditableField | null) => {
    activeEditableField.value = field;
  };

  return {
    editModeEnabled,
    setEditMode,
    toggleEditMode,
    activeEditableField,
    setActiveEditableField,
  };
};
