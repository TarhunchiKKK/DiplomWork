import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DocumentStatus } from "../enums/document-status.enum";

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

    @Column({ type: "enum", enum: DocumentStatus, default: DocumentStatus.DEFAULT })
    public status: DocumentStatus;

    @Column()
    public url: string;

    @Column()
    public authorId: string;

    @Column()
    public accessToken: string;
}
