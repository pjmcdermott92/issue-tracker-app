import { User } from "../contexts/AuthProvider";

export const checkPermissions = (user: any, requiredPermissions: string[]) => {
    const assignedPermissions = user.permissions;
    if (!requiredPermissions.some(permission => assignedPermissions.includes(permission))) {
        return false;
    } else {
        return true;
    }
}
