import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

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

    @Column()
    password: string;

    @Column({
        default: null,
    })
    surname: string;

    @Column({
        default: null,
    })
    gender: boolean;

    @Column({
        default: null,
    })
    photo: string;

    @CreateDateColumn()
    created: Date;
}
