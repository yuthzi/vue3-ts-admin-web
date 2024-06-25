/*
 * @Description: html工具
 */

export function undecodeHtml(s: string | undefined) {
  return s?.replaceAll('\n', '<br>') ?? ''
}
