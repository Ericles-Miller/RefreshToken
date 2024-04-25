import { injectable } from "inversify";
import { IBaseRepository } from "./IBaseRepository";
import { RefreshTokens, Users } from "@prisma/client";
import { RepositoryType } from "@shared/infra/database";

@injectable()
export class BaseRepository<T extends Users | RefreshTokens> implements IBaseRepository<T> {
  protected readonly repository: RepositoryType<T>;

  constructor(repository: RepositoryType<T> ) {  
    this.repository = repository;
  }

  async findById<T>(id: string): Promise<T> {
    const context = await this.repository.findUnique({
      where: {
        id,
      },
    });

    return context;
  }

  async create(data: T): Promise<T> {
    const object = await this.repository.create({ data });

    return object;
  }

  async listAll(): Promise<T[]> {
    const context = await this.repository.findMany();
    return context;
  }

  async update<T>(id: string, data: T): Promise<T> {
    const context = await this.repository.update({
      where: {
        id,
      },
      data,
    });

    return context;
  }
}