import { type ReactElement } from 'react'

import { AuthLayout } from 'src/presentation/components'
import { Submission } from 'src/presentation/pages'

export const makeSubmission = () => <Submission />

makeSubmission.getLayout = (page: ReactElement) => <AuthLayout>{page}</AuthLayout>
