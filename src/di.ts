import { registerCiDependencies } from './ci/di'
import { registerLocalDependencies } from './local/di'

export function registerDependencies(): void {
  isEnvironmentCi() ? registerCiDependencies() : registerLocalDependencies()
}

/*
  https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables
  Environment variable: GITHUB_ACTIONS.
  Description:
    Always set to true when GitHub Actions is running the workflow.
    You can use this variable to differentiate when tests are being run locally or by GitHub Actions.
*/
function isEnvironmentCi(): boolean {
  return process.env.GITHUB_ACTIONS === 'true'
}
