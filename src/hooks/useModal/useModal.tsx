import { ReactElement, useState } from "react";

export type UseModalType = [
    openModal: (content: ReactElement) => void,
    closeModal: () => void,
    content: ReactElement | null,
]

const useModal = () => {
  const [content, setContent] = useState<ReactElement | null>(null);

  const openModal = (content: ReactElement) => {
    setContent(content);
    console.log('open modal context')
  };

  const closeModal = () => {
    setContent(null);
  }

  return [openModal, closeModal, content] as UseModalType;
};

export default useModal;