import Alert from '@modules/AdministratorSettings/components/modal/Alert'
import AddAccount from '@modules/AdministratorSettings/components/modal/AddAccount'
import SelectedAccount from '@modules/AdministratorSettings/components/modal/SelectedAccount'
import { useRef } from 'react';

export default function index() {
    const selectedAccountRef = useRef<{submit: () => void}>(null);
    return (
        <>
            <Alert selectedAccountRef={selectedAccountRef} />
            <AddAccount />
            <SelectedAccount ref={selectedAccountRef}/>
        </>
    )
}