import Alert from '@modules/AdministratorSettings/components/modal/Alert'
import AddAccount from '@modules/AdministratorSettings/components/modal/AddAccount'
import SelectedAccount from '@modules/AdministratorSettings/components/modal/SelectedAccount'

export default function index() {
    return (
        <>
            <Alert />
            <AddAccount />
            <SelectedAccount/>
        </>
    )
}