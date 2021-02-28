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
};
