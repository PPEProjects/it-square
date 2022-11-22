import {
  CheckProposal,
  CheckProposalVariables
} from '#apollo/mutations/__generated__/CheckProposal'
import { CHECK_PROPOSAL } from '#apollo/mutations/proposal.mutate'
import {CheckProposalInput, ProposalStatus} from '#apollo/__generated__/types'

export const useCheckProposal = () => {
  const form = ref<CheckProposalInput>({
    id: '',
    status: ProposalStatus.WAITING,
    note: ''
  })

  const options = ref([
    {
      value: ProposalStatus.WAITING,
      label: 'Waiting'
    },
    {
      value: ProposalStatus.APPROVED,
      label: 'Approved'
    },
    {
      value: ProposalStatus.REJECTED,
      label: 'Rejected'
    }
  ])

  const { mutate, loading } = useMutation<
    CheckProposal,
    CheckProposalVariables
  >(CHECK_PROPOSAL)

  const handle = async () =>
    mutate({
      input: form.value
    })

  return {
    handle,
    loading,
    form,
    options
  }
}
