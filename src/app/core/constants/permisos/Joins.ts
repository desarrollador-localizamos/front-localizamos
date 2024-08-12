export const Joins: { [key: string]: any[] } = {
    'UsersTypes':[],
    'Roles':[],
    'RoleHasPermissions':[
        {"mainkey":"permissionId", "join":"Permissions","joinkey":"id"},
    ],
}