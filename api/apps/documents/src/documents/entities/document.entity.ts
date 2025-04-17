import { DocumentStatus } from "common/enums";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ElectronicDocument {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public title: string;

    @Column()
    public typeId: string;

    @Column()
    public aimId: string;

    @Column({ default: false })
    public isUrgent: boolean;

    @Column({ type: "enum", enum: DocumentStatus, default: DocumentStatus.DEFAULT })
    public status: DocumentStatus;

    @Column()
    public url: string;

    @Column()
    public authorId: string;

    @Column()
    public accessToken: string;

    @CreateDateColumn()
    public createdAt: Date;
}
