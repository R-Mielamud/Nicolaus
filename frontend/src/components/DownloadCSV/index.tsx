import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { CSVExporter } from "../../helpers/csv.helper";

interface Props {
    data: Record<string, any>[] | (() => Promise<Record<string, any>[]>);
    headers: string[];
    fileName: string;
    text: string;
    newLineArrays?: boolean;
}

const DownloadCSV: React.FC<Props> = ({ data, headers, fileName, text, newLineArrays }) => {
    const [exportData, setExportData] = useState<Record<string, any>[] | null>(null);
    const [csvExporter, setCsvExporter] = useState<CSVExporter | null>(null);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

    useEffect(() => {
        if (csvExporter && exportData) {
            csvExporter.revoke();
            const exporter = new CSVExporter(exportData, headers, newLineArrays);

            setCsvExporter(exporter);
            setDownloadUrl(exporter.makeURL());
        }
    }, [exportData, headers]);

    useEffect(() => {
        if (typeof data === "function") {
            data().then((newData) => {
                setCsvExporter(new CSVExporter(newData, headers, newLineArrays));
                setExportData(newData);
            });
        } else {
            setExportData(data);
        }
    }, []);

    return (
        <a download={fileName} href={downloadUrl ?? "#"}>
            <Button secondary loading={!exportData}>
                {text}
            </Button>
        </a>
    );
};

export default DownloadCSV;
