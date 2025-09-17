
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  ANALYST: 'analyst',
  VIEWER: 'viewer'
};

export const PERMISSIONS = {
  // Map permissions
  VIEW_MAP: 'view_map',
  EDIT_MAP: 'edit_map',
  EXPORT_MAP: 'export_map',
  
  VIEW_FILTERS: 'view_filters',
  EDIT_FILTERS: 'edit_filters',
  
  VIEW_DATA: 'view_data',
  EDIT_DATA: 'edit_data',
  EXPORT_DATA: 'export_data',
  
  MANAGE_USERS: 'manage_users',
  VIEW_USERS: 'view_users',
  
  ACCESS_ADMIN_PANEL: 'access_admin_panel',
  VIEW_REPORTS: 'view_reports',
  EXPORT_REPORTS: 'export_reports'
};

export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: [
    ...Object.values(PERMISSIONS)
  ],
  [ROLES.ADMIN]: [
    PERMISSIONS.VIEW_MAP,
    PERMISSIONS.EDIT_MAP,
    PERMISSIONS.EXPORT_MAP,
    PERMISSIONS.VIEW_FILTERS,
    PERMISSIONS.EDIT_FILTERS,
    PERMISSIONS.VIEW_DATA,
    PERMISSIONS.EDIT_DATA,
    PERMISSIONS.EXPORT_DATA,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.ACCESS_ADMIN_PANEL,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.EXPORT_REPORTS
  ],
  [ROLES.ANALYST]: [
    PERMISSIONS.VIEW_MAP,
    PERMISSIONS.EDIT_MAP,
    PERMISSIONS.VIEW_FILTERS,
    PERMISSIONS.EDIT_FILTERS,
    PERMISSIONS.VIEW_DATA,
    PERMISSIONS.EDIT_DATA,
    PERMISSIONS.EXPORT_DATA,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.EXPORT_REPORTS
  ],
  [ROLES.VIEWER]: [
    PERMISSIONS.VIEW_MAP,
    PERMISSIONS.VIEW_FILTERS,
    PERMISSIONS.VIEW_DATA,
    PERMISSIONS.VIEW_REPORTS
  ]
};

export const hasPermission = (userRole, permission) => {
  const permissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.includes(permission);
};

export const hasAnyPermission = (userRole, permissions) => {
  const userPermissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.some(permission => userPermissions.includes(permission));
};

export const getRolePermissions = (userRole) => {
  return ROLE_PERMISSIONS[userRole] || [];
};

export const getMenuItems = (userRole) => {
  const menuItems = [
    {
      id: 'map',
      label: 'Mapa',
      path: '/map',
      permissions: [PERMISSIONS.VIEW_MAP]
    },
    {
      id: 'filters',
      label: 'Filtros',
      path: '/filters',
      permissions: [PERMISSIONS.VIEW_FILTERS]
    },
    {
      id: 'data',
      label: 'Datos',
      path: '/data',
      permissions: [PERMISSIONS.VIEW_DATA]
    },
    {
      id: 'reports',
      label: 'Reportes',
      path: '/reports',
      permissions: [PERMISSIONS.VIEW_REPORTS]
    },
    {
      id: 'admin',
      label: 'Administración',
      path: '/admin',
      permissions: [PERMISSIONS.ACCESS_ADMIN_PANEL]
    }
  ];

  return menuItems.filter(item => 
    hasAnyPermission(userRole, item.permissions)
  );
};
