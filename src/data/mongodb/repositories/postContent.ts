import { baseMongoRepository } from './baseMongoRepository';
import { PostContentEntity, createPostContentEntity } from 'portfolio/entities';
import { PostContentModel } from 'data/mongodb/models/';
import { PostContentRepository } from 'portfolio/repositories';
/**
 *Repository for interacting with PostContent entities in MongoDB
 *@extends baseMongoRepository - for basic CRUD functionality
 *@implements PostContentRepository - for PostContent specific repository functions
 */
export class PostContentMongoRepository
	extends baseMongoRepository<PostContentEntity>
	implements PostContentRepository
{
	/*
	 *Creates a new PostContentMongoRepository instance
	 */
	constructor() {
		super(PostContentModel, createPostContentEntity);
	}
}
