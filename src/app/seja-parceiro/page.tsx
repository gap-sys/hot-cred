'use client'

import { Suspense } from 'react'
import { makeSubmission } from 'src/main/factories/pages'

function SubmissionPage() {
    const Component = makeSubmission
    return <Component />
}

export default function Page() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <SubmissionPage />
        </Suspense>
    )
}
