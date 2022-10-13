import { AxiosInstance } from 'axios'
import { message } from 'ant-design-vue'

export const useUpload = () => {
  const axios = inject<AxiosInstance>('$axios')!

  const image = async (image: Blob, endpoint: string) => {
    const formData = new FormData()
    formData.append('image', image)
    formData.append('endpoint', endpoint)

    const res: any = await axios.post('/geto/upload/single', formData)
    message.success('Upload hình ảnh thành công')
    return res?.file
  }

  const document = async (document: Blob, endpoint: string) => {}

  return {
    image,
    document
  }
}
