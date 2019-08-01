import copy from 'clipboard-copy';

type UseClipboardOptions = {
  onCopy: (t: string) => void;
  onError?: () => void;
}

const useClipboard = ({ onCopy, onError }: UseClipboardOptions) => {
  const copyHandler = async (text: string) => {
    try {
      await copy(text);

      onCopy(text);
    } catch (error) {
      onError && onError();
    }
  };

  return {
    copy: copyHandler,
  }
};

export default useClipboard;