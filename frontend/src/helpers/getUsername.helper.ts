export default function getUsername(user: WebApi.Entity.User): string {
    let name = user.email;

    if (user.first_name || user.last_name) {
        name = `${user.first_name || ""} ${user.last_name || ""}`;
    }

    return name.trim();
}
