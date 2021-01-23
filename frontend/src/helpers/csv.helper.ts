import recursiveGetAttribute from "./objects.helper";

export default class CSVExporter {
    protected objects: Record<string, any>[];
    protected headers: string[];
    protected url: string | null = "";
    protected horizontalDelimiter = ";";
    protected verticalDelimeter = "\n";
    protected quote = '"';
    protected BOM = "\ufeff";
    protected encoding = "text/csv;charset=utf-18";

    public constructor(objects: Record<string, any>[], headers: string[]) {
        this.objects = objects;
        this.headers = headers;
    }

    protected makeCSV(): string {
        let string = this.BOM + this.headers.join(this.horizontalDelimiter) + this.verticalDelimeter;
        const headersCount = this.headers.length;

        this.objects.forEach((obj) => {
            this.headers.forEach((header, i) => {
                let maybeValue = recursiveGetAttribute(obj, header);
                let value = "";

                if (maybeValue) {
                    if (Array.isArray(maybeValue)) {
                        maybeValue = maybeValue.join(this.verticalDelimeter);
                    }

                    value = this.quote + maybeValue.replace('"', '""') + this.quote;
                }

                const semi = headersCount - i === 1 ? "" : this.horizontalDelimiter;
                string += String(value) + semi;
            });

            string += this.verticalDelimeter;
        });

        return string;
    }

    public makeURL() {
        if (this.url) {
            return this.url;
        }

        const csv = this.makeCSV();
        const blob = new Blob([csv], { type: this.encoding });
        const url = URL.createObjectURL(blob);

        this.url = url;
        return url;
    }

    public revoke() {
        if (this.url) {
            URL.revokeObjectURL(this.url);
            this.url = null;
        }
    }
}
