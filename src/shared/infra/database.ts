import { PrismaClient, RefreshTokens, Users } from "@prisma/client";


export const {users, refreshTokens } = new PrismaClient();

export type RepositoryType<T> = T extends Users
  ? PrismaClient['users']
  : T extends RefreshTokens
  ? PrismaClient['refreshTokens']
  // ? PrismaClient['comments']
  : never;

export const prisma = new PrismaClient();
