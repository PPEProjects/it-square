export declare type WithRequired<T> = {
  [K in keyof T]-?: T[K] | undefined
}

// Phòng trường hợp modify thì sẽ sử dụng interface này
export interface AddProjectInput {
  name: string
  category: string
  skills: string[]
  images: any[]
  time_to_do: {
    from: string
    to: string
  },
  files: any[]
}
