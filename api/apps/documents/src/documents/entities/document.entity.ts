import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FavouriteDocumentInfo } from "../favourite/entities/favourite-document-info.entity";
import { DocumentVersion } from "../../versions/entities/document-version.entity";

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

    @Column()
    public authorId: string;

    @Column()
    public accessToken: string;

    @CreateDateColumn()
    public createdAt: Date;

    @OneToMany(() => FavouriteDocumentInfo, favourite => favourite.document)
    public favoirites: FavouriteDocumentInfo[];

    @OneToMany(() => DocumentVersion, version => version.document)
    public versions: DocumentVersion[];
}
