export const CSVHeaders = {
    MESSENGER_USER: [
        "phone",
        "messenger",
        "messenger_id",
        "requisites.delivery_address",
        "requisites.delivery_phone",
        "requisites.delivery_name",
        "requisites.post_service",
    ],
    MESSENGER_BILL: ["user.phone", "user.messenger", "amount", "comment", "created_at"],
    MESSENGER_ORDER: ["user.phone", "user.messenger", "books", "created_at"],
    AUTHOR: ["id", "name", "chosen::0", "change::0"],
    TAG_GROUP: ["id", "name", "chosen::0", "change::0"],
    PUBLISHING: ["id", "name", "change::0"],
    TAG: ["id", "name", "group", "change::0"],
    SERIES: ["id", "name", "publishing", "change::0"],
    STATUS: ["id", "name", "change::0"],
    BOOK: [
        "id",
        "title",
        "description",
        "status",
        "authors",
        "publishing",
        "series",
        "isbn",
        "orig_price",
        "discount::0",
        "in_stock",
        "pages_count",
        "paper_type",
        "chosen",
        "tags",
        "change::0",
    ],
};
