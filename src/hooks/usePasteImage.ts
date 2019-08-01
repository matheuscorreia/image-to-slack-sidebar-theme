import { useEffect } from "react";

const FilesType = 'Files'; 

type UsePasteImageOptions = {
  accept?: string[];
  onPaste: (f: File[]) => void;
}

const usePasteImage = ({ accept = [], onPaste }: UsePasteImageOptions) => {
  useEffect(() => {
    const handlePaste = ({ clipboardData }: ClipboardEvent) => {
      if(!clipboardData) return;
  
      const hasFiles = clipboardData.types.includes(FilesType);

      if(hasFiles) {
        const { items } = clipboardData;
        const files = Array.from(items)
          .filter(item => {
            if(item.kind !== 'file') return false;
            if(!accept.length) return true;
            
            return accept.includes(item.type)
          })
          .map(item => item.getAsFile()!);

        onPaste(files);
      }
    }

    document.addEventListener('paste', handlePaste);

    return () => {
      document.removeEventListener('paste', handlePaste);
    }
  }, [accept, onPaste])
};

export default usePasteImage;