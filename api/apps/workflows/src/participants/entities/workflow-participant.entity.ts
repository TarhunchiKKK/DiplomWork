import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { WorkflowParticipantRole } from "../enums/workflow-participant-role.enum";
import { Workflow } from "../../workflows/entities/workflow.entity";

@Entity()
export class WorkflowParticipant {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public userId: string;

    @Column({ type: "enum", enum: WorkflowParticipantRole })
    public role: WorkflowParticipantRole;

    @ManyToMany(() => Workflow, workflow => workflow.participants)
    public workflows: Workflow[];
}
