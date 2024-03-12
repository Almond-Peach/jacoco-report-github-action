/* eslint-disable @typescript-eslint/no-explicit-any */
import * as glob from '@actions/glob'
import * as fs from 'fs'
import parser from 'xml2js'

export type Tree = any

export async function parseTrees(combinedPatterns: string): Promise<Tree[]> {
  const splitPatterns: string[] = combinedPatterns.split(',')
  const globber: glob.Globber = await glob.create(splitPatterns.join('\n'))
  const paths: string[] = await globber.glob()

  const trees: Tree[] = await Promise.all(
    paths.map(async path => {
      const contents: string = await fs.promises.readFile(path.trim(), 'utf-8')
      const tree: any = await parser.parseStringPromise(contents)
      return tree
    })
  )
  return trees
}
