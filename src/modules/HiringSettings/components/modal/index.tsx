import Alert from '@modules/HiringSettings/components/modal/Alert'
import { DataTableRefs } from '../../types'

export default function Index({ dataTableRef }: { dataTableRef: DataTableRefs }) {
    return (
        <>
            <Alert dataTableRef={dataTableRef} />
        </>
    )
}