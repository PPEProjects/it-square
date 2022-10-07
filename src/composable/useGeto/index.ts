import { ApolloClient, NormalizedCache } from '@apollo/client/core'
import { useApolloClient } from '@vue/apollo-composable'
import {ApolloEnum} from "@plugins/apollo";

export const useGeto = (): ApolloClient<NormalizedCache> => {
  return useApolloClient(ApolloEnum.it).client
}
