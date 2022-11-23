import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { People } from '../../user/types/people.type'
import * as mongoose from 'mongoose'
import { IsEmpty, IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/user/schemas/user.schema";



@Schema()
export class PostClass {

    @IsNotEmpty()
    @Prop({ required: true })
    pictures: string[]

    @IsNotEmpty()
    @Prop({ required: true })
    caption: string

    @IsOptional()
    @Prop()
    location: string

    @IsOptional()
    @Prop()
    tagPeople: People[]

    @IsEmpty()
    @Prop({ default: 0 })
    likes: number

    @IsOptional()
    @Prop({ type: mongoose.Types.ObjectId, ref: 'User' , required:true })
    userId

    @IsEmpty()
    @Prop(raw([{
        comment: { content: { type: String }, user: { type: mongoose.Types.ObjectId, ref: 'User' }, replys: [{ reply: { type: String, user: { type: mongoose.Types.ObjectId, ref: 'User' } } }] }
    }]))
    comments
}



export const PostSchema = SchemaFactory.createForClass(PostClass)