import React, { useRef } from "react";
import { Button } from "semantic-ui-react";

interface Props {
    text: string;
    clear?: boolean;
    allow?: string;
    onUpload: (file: File) => void;
}

const MaskedFileInput: React.FC<Props> = ({ text, clear, allow, onUpload }) => {
    const ref = useRef<HTMLInputElement | null>(null);

    const selectFile = () => {
        const input = ref.current;

        if (input) {
            input.click();
        }
    };

    const onSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (!files || files.length <= 0) {
            return;
        }

        const file = files[0];
        onUpload(file);

        if (clear) {
            const input = ref.current;

            if (input) {
                input.files = new DataTransfer().files;
            }
        }
    };

    return (
        <>
            <Button secondary onClick={selectFile}>
                {text}
            </Button>
            <input type="file" style={{ display: "none" }} accept={allow} onChange={onSelected} ref={ref} />
        </>
    );
};

export default MaskedFileInput;
