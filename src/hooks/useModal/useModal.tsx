import { ReactElement, useState } from "react";

export type UseModalType = [
    openModal: (content: ReactElement) => void,
    closeModal: () => void,
    content: ReactElement | null,
]

export const useModal = () => {
  const [content, setContent] = useState<ReactElement | null>(null);

  const openModal = (content: ReactElement) => {
    setContent(content);
  };

  const closeModal = () => {
    setContent(null);
  }

  return [openModal, closeModal, content] as UseModalType;
};