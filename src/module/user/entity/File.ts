import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "files" })
export class File extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    filename: string;

    @Column()
    extension: string;

    @Column({
        type: "number",
        nullable: true,
    })
    user_id?: number;

    @ManyToOne(type => User, user => user.photo, { nullable: true })
    @JoinColumn({ name: "user_id"})
    user?: User;
}
