import React, { useMemo, useState } from "react";
import { Button } from "semantic-ui-react";
import { CSVExporter } from "../../helpers/csv.helper";

interface Props {
    data: Record<string, any>[];
    headers: string[];
    fileName: string;
    text: string;
}

const DownloadCSV: React.FC<Props> = ({ data, headers, fileName, text }) => {
    const [csvExporter, setCsvExporter] = useState<CSVExporter>(new CSVExporter(data, headers));
    const [downloadUrl, setDownloadUrl] = useState<string>(csvExporter.makeURL());

    useMemo(() => {
        csvExporter.revoke();
        const exporter = new CSVExporter(data, headers);

        setCsvExporter(exporter);
        setDownloadUrl(exporter.makeURL());
    }, [data, headers]);

    return (
        <a download={fileName} href={downloadUrl}>
            <Button secondary>{text}</Button>
        </a>
    );
};

export default DownloadCSV;
