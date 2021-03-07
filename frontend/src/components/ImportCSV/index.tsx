import React from "react";
import { CSVImporter } from "../../helpers/csv.helper";
import MaskedFileInput from "../common/MaskedFileInput";

interface Props<D = any> {
    text: string;
    headers: string[];
    onGetData: (data: D[]) => void;
}

const ImportCSV: React.FC<Props> = function <D>({ text, headers, onGetData }: Props<D>) {
    const startReading = (file: File) => {
        const reader = new FileReader();

        reader.onloadend = (event: ProgressEvent<FileReader>) => {
            const output = event.target;

            if (output && output.result) {
                const importer = new CSVImporter<D>(output.result as string, headers);
                onGetData(importer.importCSV());
            }
        };

        reader.readAsText(file);
    };

    const onUpload = (file: File) => {
        if (file.type === "text/csv") {
            startReading(file);
        }
    };

    return <MaskedFileInput text={text} onUpload={onUpload} clear allow=".csv" />;
};

export default ImportCSV;
