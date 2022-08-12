interface ImportMetaEnv {
  readonly NODE_ENV: string

  readonly VITE_ISQUARE: string

  readonly VITE_SMILE_EYE_SERVER: string
  readonly VITE_SMILE_EYE_GRAPHQL: string

  readonly VITE_BUNNY_URL: string
  readonly VITE_BUNNY_TOKEN: string

  readonly VITE_NOTIFY_GRAPHQL: string
  readonly VITE_NOTIFY_SUBSCRIPTION: string
  readonly VITE_NOTIFY_API_KEY: string

}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
