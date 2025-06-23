import { OpenAccount } from 'src/presentation/pages'

interface OpenAccountProps {
    cpf?: string;
}

export const makeOpenAccount = (props: OpenAccountProps) => <OpenAccount {...props} />
