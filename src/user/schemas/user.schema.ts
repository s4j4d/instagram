import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Follower } from "../types/follower.type";
import { Following } from "../types/following.type";
import { IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator'


//class schema is also used as dto for creation


@Schema()
export class User {
    @IsNotEmpty()
    @IsString()
    @Prop({unique:true , required: true})
    username: string

    @IsNotEmpty()
    @IsString()
    @Prop({required:true})
    name: string

    @IsOptional()
    @Prop({enum:['male','female'] , required:true})
    gender : string

    @IsOptional()
    @Prop()
    email: string

    @IsNotEmpty()
    @Prop({required:true})
    password: string

    @IsOptional()
    @Prop()
    phoneNumber: string

    @IsOptional()
    @Prop()
    profilePicture : string

    @IsOptional()
    @Prop()
    bio: string

    @IsEmpty()
    @Prop()
    followers : Array<Follower>

    @IsEmpty()
    @Prop()
    following :Array<Following>


}



export const UserSchema = SchemaFactory.createForClass(User)