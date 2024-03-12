/* eslint-disable @typescript-eslint/no-explicit-any */
import * as github from '@actions/github'
import { GitHub } from '@actions/github/lib/utils'
import type { OctokitResponse } from '@octokit/types/dist-types'
import { inject, injectable } from 'tsyringe'
import { GitHubFacade, PullRequestFile } from '../common/github'
import { InputFacade } from '../common/input'

@injectable()
export class CiGitHubFacade implements GitHubFacade {
  private _octokit: InstanceType<typeof GitHub> | undefined
  private get octokit(): InstanceType<typeof GitHub> {
    return this._octokit ?? this.cacheOctokit()
  }

  constructor(@inject('InputFacade') private readonly _inputFacade: InputFacade) {}

  getEventName(): string {
    return github.context.eventName
  }

  getPullRequestNumber(): number | undefined {
    return github.context.payload.pull_request?.number
  }

  async getPullRequestFiles(): Promise<PullRequestFile[]> {
    const commitsWithBaseheadComparison: OctokitResponse<any, number> =
      await this.octokit.rest.repos.compareCommitsWithBasehead({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        basehead: this.getPullRequestBasehead(),
      })

    if (!commitsWithBaseheadComparison.data.files) return []

    const pullRequestFiles: PullRequestFile[] = []
    for (const file of commitsWithBaseheadComparison.data.files) {
      const pullRequestFile: PullRequestFile = {
        path: file.filename,
        url: file.blob_url,
      }
      pullRequestFiles.push(pullRequestFile)
    }
    return pullRequestFiles
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
    let pullRequestCommentUpdated: boolean = false

    const pullRequestComments: OctokitResponse<any, number> =
      await this.octokit.rest.issues.listComments({
        issue_number: pullRequestNumber,
        ...github.context.repo,
      })

    const pullRequestComment: any = pullRequestComments.data.find((it: any) =>
      it.body.startsWith(title)
    )

    if (pullRequestComment) {
      await this.octokit.rest.issues.updateComment({
        comment_id: pullRequestComment.id,
        body: body,
        ...github.context.repo,
      })
      pullRequestCommentUpdated = true
    }

    if (!pullRequestCommentUpdated) {
      await this.octokit.rest.issues.createComment({
        issue_number: pullRequestNumber,
        body: body,
        ...github.context.repo,
      })
    }
  }

  private cacheOctokit(): InstanceType<typeof GitHub> {
    return (this._octokit = github.getOctokit(this._inputFacade.input.githubToken))
  }

  private getPullRequestBasehead(): string {
    const base: string = github.context.payload.pull_request?.base.sha
    const head: string = github.context.payload.pull_request?.head.sha
    return `${base}...${head}`
  }
}
