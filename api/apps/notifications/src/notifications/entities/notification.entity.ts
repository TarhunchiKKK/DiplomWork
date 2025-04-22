import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { NotificationSubject } from "../enums/notification-subjects.enum";
import { NotificationStatus } from "../enums/notification-status.enum";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ type: "enum", enum: NotificationSubject })
    public subject: NotificationSubject;

    @Column({ nullable: true, default: null })
    public message?: string;

    @Column({ type: "enum", enum: NotificationStatus, default: NotificationStatus.ACTIVE })
    public status: NotificationStatus;

    @Column()
    public receiverId: string;

    @CreateDateColumn()
    public createdAt: Date;
}
