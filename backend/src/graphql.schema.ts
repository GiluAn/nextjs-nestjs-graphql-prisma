
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface SignInInput {
    userId: string;
    password: string;
}

export interface CreateUserInput {
    userId: string;
    password: string;
    name: string;
}

export interface UpdateUserInput {
    id: number;
    userId: string;
    password: string;
    name: string;
}

export interface User {
    id: string;
    userId: string;
    password: string;
    name: string;
    salt: string;
}

export interface IQuery {
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    signIn(signInInput: SignInInput): User | Promise<User>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
    removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
