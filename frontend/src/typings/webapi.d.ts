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
}
