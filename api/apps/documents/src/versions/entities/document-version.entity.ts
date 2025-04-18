import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DocumentVersion {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ nullable: true, default: null })
    public description?: string;

    @Column()
    public versionNumber: number;

    @Column()
    public url: string;

    @CreateDateColumn()
    public createdAt: Date;
}
