def admin_route(action):
    def wrapper(request, *args, **kwargs):
        if request.user and request.user.is_admin:
            return action(request, *args, **kwargs)

        raise 
