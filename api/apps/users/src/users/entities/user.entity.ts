import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../../../../common/enums/role.enum";
import { AccountStatus } from "../enums/account-status.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ nullable: true, default: null })
    public username?: string;

    @Column()
    public email: string;

    @Column({ nullable: true })
    public password?: string;

    @Column({ type: "enum", enum: AccountStatus })
    public status: AccountStatus;

    @Column({ type: "enum", enum: Role })
    public role: Role;

    @Column()
    public organizationId: string;

    @Column({ nullable: true, default: null })
    public privateKey?: string;

    @Column({ nullable: true, default: null })
    public publicKey?: string;

    @CreateDateColumn()
    public createdAt: Date;

    @Column({ default: false })
    public isTwoFactorEnabled: boolean;

    @Column({ default: false })
    public isDeactivated: boolean;
}
