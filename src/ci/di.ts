import { container, Lifecycle } from 'tsyringe'
import { CiGitHubFacade } from './github'
import { CiInputFacade } from './input'
import { CiLogger } from './logger'
import { CiStatusFacade } from './status'

export function registerCiDependencies(): void {
  container.register('Logger', { useClass: CiLogger }, { lifecycle: Lifecycle.Singleton })
  container.register(
    'StatusFacade',
    { useClass: CiStatusFacade },
    { lifecycle: Lifecycle.Singleton }
  )
  container.register('InputFacade', { useClass: CiInputFacade }, { lifecycle: Lifecycle.Singleton })
  container.register(
    'GitHubFacade',
    { useClass: CiGitHubFacade },
    { lifecycle: Lifecycle.Singleton }
  )
}
