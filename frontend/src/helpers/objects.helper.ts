export default function recursiveGetAttribute(obj: Record<string, any>, name: string) {
    const props: string[] = name.split(".");
    let value: any = obj;

    for (const prop of props) {
        if (value.hasOwnProperty(prop)) {
            value = value[prop];

            if (value) {
                continue;
            }
        }

        return;
    }

    return value;
}
