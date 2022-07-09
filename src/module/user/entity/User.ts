import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { File } from './File';

@Entity({ name: "users" })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    name: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column({
        select: false
    })
    password: string;

    @Column({
        default: null,
    })
    surname: string;

    @Column({
        default: null,
    })
    gender: boolean;

    @CreateDateColumn()
    created: Date;

    @OneToMany(type => File, file => file.user, { eager: true })
    photo: File[];
}
