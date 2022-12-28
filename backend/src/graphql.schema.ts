
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
    id: string;
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
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
    auth(): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    signIn(signInInput: SignInInput): User | Promise<User>;
    signOut(): boolean | Promise<boolean>;
}

type Nullable<T> = T | null;
