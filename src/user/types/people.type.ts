import {PickType} from '@nestjs/mapped-types'
import { User } from 'src/user/schemas/user.schema';



export class People extends PickType(User , ['name' , 'username'] as const) {}