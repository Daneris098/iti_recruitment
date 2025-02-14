import Alert from '@modules/OrganizationSettings/components/modal/Alert'
import CreateAccount from "@modules/OrganizationSettings/components/modal/CreateAccount"
export default function index({ dataTableRef }: { dataTableRef: React.RefObject<{ saveAll: () => void; cancelAll: () => void }> }) {
   return (
        <>
            <CreateAccount/>
            <Alert dataTableRef={dataTableRef} />
        </>
    )
}