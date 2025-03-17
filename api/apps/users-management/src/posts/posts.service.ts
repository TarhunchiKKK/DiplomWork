import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./entities/post.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostsService {
    public constructor(@InjectRepository(Post) private readonly postsRepository: Repository<Post>) {}

    public async create(dto: CreatePostDto) {
        return this.postsRepository.create(dto);
    }

    public async findAllByUserId(userId: string) {
        return await this.postsRepository.find({
            where: {
                user: {
                    id: userId
                }
            },
            relations: {
                user: true
            }
        });
    }

    public async update(userId: string, dto: UpdatePostDto) {
        const post = await this.postsRepository.findOne({
            where: {
                user: {
                    id: userId
                }
            },
            relations: {
                user: true
            }
        });

        if (post) {
            Object.assign(post, dto);
            await this.postsRepository.save(post);
        }
    }
}
