import {ComputedRef, Ref} from 'vue'

export const useResult = <T>(result: Ref<T>, initValue: any): ComputedRef<T> => {
    return computed(() => result.value ?? initValue)
}
