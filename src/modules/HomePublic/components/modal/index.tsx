import ApplicationModal from '@modules/HomePublic/components/modal/application'
import DrawerFilter from "@src/modules/HomePublic/components/DrawerFilter";

export default function index() {
    return (
        <>
            <DrawerFilter />
            <ApplicationModal />
        </>
    )
}