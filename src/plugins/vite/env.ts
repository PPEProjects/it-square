import { Plugin } from 'vite'
import fs from 'fs'

export default () => {
  const content: Plugin = {
    name: 'vite:env-generator',
    async buildStart() {
      const envContent = fs.readFileSync('.env', 'utf8')

      if(envContent) {
        const lines: string[] = envContent.split('\n').map(line => line.trim())

        let template = `interface ImportMetaEnv {`
        lines.forEach(line => {

          if(/^\w*=/.test(line)) {
            template += `\n  readonly ${line.split('=')[0]}: string`
          } else {
            // Todo: add support for comments
            template += `\n`
            // template += `\n  // ${line}`
          }
        })

        template += '\n}\n'
        template += `
interface ImportMeta {
  readonly env: ImportMetaEnv
}
`
        fs.writeFileSync('./types/env.d.ts', template)
      }
    }
  }

  return content
}
