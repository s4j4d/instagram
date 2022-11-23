
import {PickType} from '@nestjs/mapped-types'
import { User } from '../schemas/user.schema'


export class Follower extends PickType(User , ['name' , 'username'] as const){}