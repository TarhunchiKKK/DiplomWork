import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { WorkflowParticipantRole } from "../enums/workflow-participant-role.enum";
import { Workflow } from "../../workflows/entities/workflow.entity";

@Entity()
export class WorkflowParticipant {
    @PrimaryGeneratedColumn()
    public id: string;

    @Column()
    public userId: string;

    @Column({ type: "enum", enum: WorkflowParticipantRole })
    public role: WorkflowParticipantRole;

    @ManyToOne(() => Workflow, workflow => workflow.participants)
    @JoinColumn()
    public workflow: Workflow;
}
