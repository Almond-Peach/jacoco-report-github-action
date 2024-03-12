/* eslint-disable @typescript-eslint/no-unused-vars */

import { readFile, writeFile } from 'fs/promises'
import { injectable } from 'tsyringe'
import { GitHubEvent, GitHubFacade, PullRequestFile } from '../common/github'

@injectable()
export class LocalGitHubFacade implements GitHubFacade {
  getEventName(): string {
    return GitHubEvent.PULL_REQUEST
  }

  getPullRequestNumber(): number | undefined {
    return 0
  }

  async getPullRequestFiles(): Promise<PullRequestFile[]> {
    return readFromFile<PullRequestFile[]>('./.local/pull-request-files.json')
  }

  async addCommentToPullRequest({
    pullRequestNumber,
    title,
    body,
  }: {
    pullRequestNumber: number
    title: string
    body: string
  }): Promise<void> {
    writeToFile({
      path: './.local/pull-request-comment.md',
      data: body,
    })
  }
}

async function readFromFile<T>(path: string): Promise<T> {
  try {
    const contents: string = await readFile(path, 'utf8')
    return JSON.parse(contents) as T
  } catch (error: unknown) {
    throw error
  }
}

async function writeToFile({ path, data }: { path: string; data: string }): Promise<void> {
  try {
    await writeFile(path, data)
  } catch (error: unknown) {
    throw error
  }
}
