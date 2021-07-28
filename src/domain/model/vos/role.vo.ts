export class RoleVO {

    get value(): Role {
        return this.role;
    }

    private constructor(private role: Role) {}

    static create(role: Role): RoleVO {
        return new RoleVO(role);
    }

}

export enum Role {
    ADMIN='ADMIN',
    USER='USER'
}