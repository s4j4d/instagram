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
    @Prop([{ type: mongoose.Types.ObjectId, ref: 'User'}])
    likes: string[]

    @IsOptional()
    @Prop({ type: mongoose.Types.ObjectId, ref: 'User' , required:true })
    userId : string

    @IsEmpty()
    @Prop(raw([{
        text: { type: String , required:true}, user: { type: mongoose.Types.ObjectId, ref: 'User' , required:true},likes:[{ type: mongoose.Types.ObjectId, ref: 'User'}],
         replies: [{ text:{type: String , required:true}, likes:[{ type: mongoose.Types.ObjectId, ref: 'User'}],user: { type: mongoose.Types.ObjectId, ref: 'User' , required:true} } ] 
    }]))
    comments
}



export const PostSchema = SchemaFactory.createForClass(PostClass)