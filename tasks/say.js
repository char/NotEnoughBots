import Task from './task'
import { bot } from '../main'

export default class Say extends Task {

    handle(username, args){
        bot.chat(args.join(' '))
    }

}