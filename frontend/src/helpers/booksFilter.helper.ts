function optionalArrayField(key: string, value: Array<any>): Record<string, any> {
    return value.length ? { [key]: value.join(",") } : {};
}

export default function convertFilterToQuery(filter: WebApi.Specific.BooksFilter) {
    return {
        ...filter,
        ...optionalArrayField("tags", filter.tags),
        ...optionalArrayField("authors", filter.authors),
        ...optionalArrayField("publishings", filter.publishings),
        ...optionalArrayField("series", filter.series),
        ...optionalArrayField("statuses", filter.statuses),
        ...(filter.search ? { search: filter.search } : {}),
    };
}
