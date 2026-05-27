import { useUser } from "./useAuth";

/**
 * Resolves a user's entire permission list into a highly optimized O(1) lookup Set
 * for ultra-fast frontend capability validation without array scanning.
 */
export function resolvePermissions(user: any) {
  if (!user) return { has: () => false, isAdmin: false, permissionKeys: new Set<string>() };

  const roleName = typeof user.role === 'object' ? (user.role as any)?.name : user.role;
  const isAdmin = roleName?.toUpperCase() === 'ADMIN' || roleName?.toUpperCase() === 'SUPER ADMIN';

  const permissions = user.role?.permissions || user.roleData?.permissions || [];
  
  // Build a Set of "resource:action" strings for O(1) lookup speed
  const permissionKeys = new Set<string>(
    permissions.map((p: any) => `${p.resource.toLowerCase()}:${p.action.toUpperCase()}`)
  );

  return {
    isAdmin,
    permissionKeys,
    has: (resource: string, action: string): boolean => {
      if (isAdmin) return true;
      const res = resource.toLowerCase();
      const act = action.toUpperCase();

      // Check exact match, or if user has global 'MANAGE' capability on this resource
      return (
        permissionKeys.has(`${res}:${act}`) ||
        permissionKeys.has(`${res}:MANAGE`)
      );
    }
  };
}

/**
 * Dynamic Hook for checking user capabilities on the frontend.
 * Usage: 
 *   const { hasPermission, isAdmin } = usePermissions();
 *   if (hasPermission('product', 'CREATE')) { ... }
 */
export function usePermissions() {
  const { data: user } = useUser();

  // Pre-resolve for maximum execution performance
  const resolved = resolvePermissions(user);

  // Check if user belongs to a specific role group
  const hasRole = (roleName: string): boolean => {
    if (!user) return false;
    const currentRole = typeof user.role === 'object' ? (user.role as any)?.name : user.role;
    return currentRole?.toUpperCase() === roleName.toUpperCase();
  };

  return {
    hasPermission: resolved.has,
    hasRole,
    isAdmin: resolved.isAdmin,
    user,
  };
}
