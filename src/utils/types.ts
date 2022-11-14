import { CreateProjectInput } from '#apollo/__generated__/types'

export interface ProjectFormInstance {
  submitForm: () => Promise<CreateProjectInput>
  form: CreateProjectInput
  setForm: (form: CreateProjectInput) => void
  setTechs: (techs: { label: string; value: string }[]) => void
}
