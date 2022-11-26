import { PartialType } from "@nestjs/mapped-types"
import { PostClass } from "../schemas/post.schema"



export class dataObject extends PartialType(PostClass){ }