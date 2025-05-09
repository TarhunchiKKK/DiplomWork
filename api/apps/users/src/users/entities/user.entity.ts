import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role, AccountStatus, AuthType } from "common/enums";

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

    @Column({ type: "enum", enum: AccountStatus, default: AccountStatus.INVITED })
    public status: AccountStatus;

    @Column({ type: "enum", enum: Role })
    public role: Role;

    @Column()
    public organizationId: string;

    @CreateDateColumn()
    public createdAt: Date;

    @Column({ type: "enum", enum: AuthType, default: AuthType.BASIC })
    public authType: AuthType;

    @Column({ nullable: true, default: null })
    public totpSecret?: string;

    public get useBasicAuth() {
        return this.authType === AuthType.BASIC;
    }
}
