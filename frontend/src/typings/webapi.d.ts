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

    interface RegisterUser {
        email: string;
        password: string;
        telephone?: string;
        first_name?: string;
        last_name?: string;
        is_admin: boolean;
    }

    interface UpdateUser {
        email: string;
        telephone?: string;
        first_name?: string;
        last_name?: string;
    }
}
namespace WebApi.Specific {
    interface AuthResult {
        jwt_token: string;
        user: WebApi.Entity.User;
    }
}
