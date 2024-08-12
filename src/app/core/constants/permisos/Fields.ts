export const Fields: { [key: string]: any[] } ={
  UsersTypes:[
      {campo:"id", texto: "id" },
      {campo:"name", texto: "campo" },
      {campo:"status", texto: "campo"}
    ],

    Roles:[
      {campo:"id", texto: "id" },
      {campo:"name", texto: "role id" },
    ],

    RoleHasPermissions:[
      {campo:"permissionId", texto: "id" },
      {campo:"roleId", texto: "role id" },
      {campo:"Permissions.name", texto: "campo" },
    ],

    
  };