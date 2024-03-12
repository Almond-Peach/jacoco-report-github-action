import 'reflect-metadata'
import { container } from 'tsyringe'
import { registerDependencies } from './di'
import { Action } from './action/action'

registerDependencies()
container.resolve(Action).run()
