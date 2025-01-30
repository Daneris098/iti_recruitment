import ApplicationModal from '@modules/Home/components/modal/application'
// import DetailModal from '@modules/Home/components/modal/detail'
import DrawerFilter from "@src/modules/Home/components/DrawerFilter";

export default function index() {
    return (
        <>
            <DrawerFilter />
            <ApplicationModal />
            {/* <DetailModal /> */}
        </>
    )
}