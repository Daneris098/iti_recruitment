import Alert from '@modules/OrganizationSettings/components/modal/Alert'
export default function index({ dataTableRef }: { dataTableRef: React.RefObject<{ saveAll: () => void; cancelAll: () => void }> }) {
   return (
        <>
            <Alert dataTableRef={dataTableRef} />
        </>
    )
}