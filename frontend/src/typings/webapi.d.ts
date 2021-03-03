interface Identified {
    id: number;
    [key: string]: any;
}

namespace WebApi.Entity {
    interface User extends Identified {
        email: string;
        telephone?: string;
        first_name?: string;
        last_name?: string;
        is_admin: boolean;
    }

    interface Tag extends Identified {
        name: string;
    }

    interface ChangeTag extends Identified {
        name: string;
        group: number;
    }

    interface CSVChangeTag extends Identified {
        name: string;
        group: number;
        change: boolean;
    }

    interface TagGroup extends Identified {
        name: string;
        tags: Tag[];
    }

    interface ChangeTagGroup extends Identified {
        name: string;
        chosen: boolean;
    }

    interface CSVChangeTagGroup extends Identified {
        name: string;
        chosen: boolean;
        change: boolean;
    }

    interface Author extends Identified {
        name: string;
    }

    interface ChangeAuthor extends Identified {
        name: string;
        chosen: boolean;
    }

    interface CSVChangeAuthor extends Identified {
        name: string;
        chosen: boolean;
        change: boolean;
    }

    interface Series extends Identified {
        name: string;
    }

    interface ChangeSeries extends Identified {
        name: string;
        publishing: number;
    }

    interface CSVChangeSeries extends Identified {
        name: string;
        publishing: number;
        change: boolean;
    }

    interface Publishing extends Identified {
        name: string;
    }

    interface ChangePublishing extends Identified {
        name: string;
    }

    interface CSVChangePublishing extends Identified {
        name: string;
        change: boolean;
    }

    interface Status extends Identified {
        name: string;
    }

    interface MinimalBook extends Identified {
        title: string;
        image: string;
        authors: Author[];
        status?: Status;
        price: number;
        orig_price: number;
        discount: number;
        is_in_stock: boolean;
    }

    interface Book extends Identified {
        title: string;
        description?: string;
        status?: Status;
        image: string;
        authors: Author[];
        publishing?: Publishing;
        series?: Series;
        isbn: string;
        price: number;
        orig_price: number;
        discount: number;
        is_in_stock: boolean;
        pages_count: number;
        paper_type: string;
        tags: Tag[];
    }

    interface ChangeBook extends Identified {
        title: string;
        description?: string;
        status?: Status;
        image: string;
        authors: Author[];
        publishing?: Publishing;
        series?: Series;
        isbn: string;
        orig_price: number;
        discount: number;
        in_stock: number;
        pages_count: number;
        paper_type: string;
        chosen: boolean;
        tags: Tag[];
    }
}

namespace WebApi.BotEntity {
    interface Requisites extends Identified {
        delivery_phone: string;
        delivery_name: string;
        post_service: string;
        delivery_address: string;
    }

    interface MinimalUser extends Identified {
        messenger: string;
        phone?: string;
    }

    interface User extends MinimalUser {
        messenger_id: string;
        requisites?: Requisites;
    }

    interface Bill extends Identified {
        amount: string;
        comment: string;
        user: MinimalUser;
        created_at: string;
    }

    interface Order extends Identified {
        books: string[];
        user: MinimalUser;
        created_at: string;
    }
}

namespace WebApi.Specific {
    interface AuthResult {
        jwt_token: string;
        user: WebApi.Entity.User;
    }

    interface BooksFilter {
        from: number;
        limit: number;
        authors: number[];
        series: number[];
        publishings: number[];
        statuses: number[];
        tags: numbers[];
        search?: string;
    }

    interface ListBooksResult {
        has_more: boolean;
        books: WebApi.Entity.MinimalBook[];
    }

    interface ListAdminBooksResult {
        has_more: boolean;
        books: WebApi.Entity.ChangeBook[];
    }
}
