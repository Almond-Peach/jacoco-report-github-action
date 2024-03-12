import { container, Lifecycle } from 'tsyringe'
import { LocalGitHubFacade } from './github'
import { LocalInputFacade } from './input'
import { LocalLogger } from './logger'
import { LocalStatusFacade } from './status'

export function registerLocalDependencies(): void {
  container.register('Logger', { useClass: LocalLogger }, { lifecycle: Lifecycle.Singleton })
  container.register(
    'StatusFacade',
    { useClass: LocalStatusFacade },
    { lifecycle: Lifecycle.Singleton }
  )
  container.register(
    'InputFacade',
    { useClass: LocalInputFacade },
    { lifecycle: Lifecycle.Singleton }
  )
  container.register(
    'GitHubFacade',
    { useClass: LocalGitHubFacade },
    { lifecycle: Lifecycle.Singleton }
  )
}
