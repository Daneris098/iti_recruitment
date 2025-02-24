import ApplicationModal from '@modules/HomePublic/components/modal/application'
// import DetailModal from '@modules/Home/components/modal/detail'
import DrawerFilter from "@src/modules/HomePublic/components/DrawerFilter";

export default function index() {
    return (
        <>
            <DrawerFilter />
            <ApplicationModal />
            {/* <DetailModal /> */}
        </>
    )
}