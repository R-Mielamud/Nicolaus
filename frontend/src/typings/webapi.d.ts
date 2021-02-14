interface Identified {
    id: number;
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

    interface TagGroup extends Identified {
        name: string;
        tags: Tag[];
    }

    interface Author extends Identified {
        name: string;
    }

    interface Series extends Identified {
        name: string;
    }

    interface Publishing extends Identified {
        name: string;
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
        discount: number;
        is_in_stock: boolean;
        pages_count: number;
        paper_type: string;
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
}
