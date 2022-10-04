import { App } from 'vue'

//CDN
enum CDNLocation {
  LOCAL
}

const $cdn = (path: string, location = CDNLocation.LOCAL) => {
  if (!path) {
    return ''
  }

  if (/^http/.test(path)) {
    return path
  }

  let _path = path.replace(/^\//, '')

  switch (location) {
    case CDNLocation.LOCAL:
      _path = 'http://localhost:3000/' + path
      break
  }

  return _path
}

const $moneyFormat = (money: number) => {
  const fotmatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  })
  return fotmatter.format(money)
}

const $env = (key: keyof ImportMetaEnv) => {
  return import.meta.env[key]
}

// Link Builder

// Cutsom type
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $cdn: typeof $cdn
    $moneyFormat: typeof $moneyFormat
    $env: typeof $env
  }
}

// Install Function
const plugin = {
  install(app: App) {
    app.config.globalProperties.$cdn = $cdn
    app.provide('$cdn', $cdn)
    app.config.globalProperties.$moneyFormat = $moneyFormat
    app.provide('$moneyFormat', $moneyFormat)
    app.config.globalProperties.$env = $env
  }
}

export default plugin

export { CDNLocation }
