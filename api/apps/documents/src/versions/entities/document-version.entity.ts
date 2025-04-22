import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ElectronicDocument } from "../../documents/entities/document.entity";
import { DocumentComment } from "../../comments/entities/document-comment.entity";

@Entity()
export class DocumentVersion {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ nullable: true, default: null })
    public description?: string;

    @Column()
    public url: string;

    @CreateDateColumn()
    public createdAt: Date;

    @ManyToOne(() => ElectronicDocument, document => document.versions)
    @JoinColumn()
    public document: ElectronicDocument;

    @OneToMany(() => DocumentComment, comment => comment.version)
    public comments: DocumentComment[];
}
