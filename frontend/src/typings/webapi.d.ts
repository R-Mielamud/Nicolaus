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

    interface User extends Identified {
        messenger: string;
        messenger_id: string;
        phone?: string;
        requisites?: Requisites;
    }
}

namespace WebApi.Specific {
    interface AuthResult {
        jwt_token: string;
        user: WebApi.Entity.User;
    }
}
