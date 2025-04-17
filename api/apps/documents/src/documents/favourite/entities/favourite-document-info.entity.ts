import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ElectronicDocument } from "../../entities/document.entity";

@Entity()
export class FavouriteDocumentInfo {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public userId: string;

    @ManyToOne(() => ElectronicDocument, document => document.favoirites)
    @JoinColumn()
    public document: ElectronicDocument;
}
