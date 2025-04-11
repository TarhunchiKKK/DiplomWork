import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role, AccountStatus } from "common/enums";

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

    @Column({ type: "enum", enum: AccountStatus, default: AccountStatus.ACTIVE })
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
