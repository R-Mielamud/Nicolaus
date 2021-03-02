import recursiveGetAttribute from "./objects.helper";

interface BasicObject {
    [key: string]: any;
}

interface Header {
    name: string;
    defaultValue?: string;
}

function parseHeader(stringHeader: string): Header {
    const parts = stringHeader.split("::");
    const header: Header = { name: parts[0] };

    if (parts.length > 1) {
        header.defaultValue = parts[1];
    }

    return header;
}

export class CSVExporter {
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
        let string =
            this.BOM +
            this.headers.map((h) => parseHeader(h).name).join(this.horizontalDelimiter) +
            this.verticalDelimeter;

        const headersCount = this.headers.length;

        this.objects.forEach((obj) => {
            this.headers.forEach((stringHeader, i) => {
                const { name: header, defaultValue }: Header = parseHeader(stringHeader);
                let maybeValue = recursiveGetAttribute(obj, header) || defaultValue;
                let value = "";

                if (maybeValue !== undefined || maybeValue !== null) {
                    if (Array.isArray(maybeValue)) {
                        maybeValue = maybeValue.join(this.verticalDelimeter);
                    } else if (typeof maybeValue === "boolean") {
                        maybeValue = maybeValue ? "1" : "0";
                    }

                    if (typeof maybeValue !== "string") {
                        maybeValue = String(maybeValue);
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

export class CSVImporter<T extends BasicObject> {
    protected fileText: string;
    protected headers: string[];
    protected horizontalDelimiter = ";";
    protected verticalDelimeter = /\n|\r|\n\r|\r\n/;
    protected quote = '"';

    public constructor(fileText: string, headers: string[]) {
        this.fileText = fileText.trim();
        this.headers = headers;
    }

    public importCSV(): T[] {
        const objects: T[] = [];
        const strings: string[] = this.fileText.split(this.verticalDelimeter).slice(1);

        strings.forEach((string) => {
            const object: Partial<T> = {};
            const values: string[] = string.split(this.horizontalDelimiter);

            values.forEach((value: any, index) => {
                if (value[0] === this.quote) {
                    value = value.slice(1);
                }

                if (value[value.length - 1] === this.quote) {
                    value = value.slice(0, -1);
                }

                if (value === "1" || value === "0") {
                    value = value === "1" ? true : false;
                }

                if (!isNaN(+value)) {
                    value = Number(value);
                }

                const stringHeader: string = this.headers[index];
                const { name: header }: Header = parseHeader(stringHeader);
                type Type = T[typeof header];
                const typedValue = value as Type;

                object[header as keyof T] = typedValue;
            });

            objects.push(object as T);
        });

        return objects;
    }
}
