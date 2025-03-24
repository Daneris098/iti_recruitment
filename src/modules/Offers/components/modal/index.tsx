import PDFModal from '@modules/Applicants/components/modal/pdfModal'

export default function index () {
    return (
        <>
        <PDFModal isOpen={false} onClose={function (): void {
                throw new Error('Function not implemented.')
            } } children={undefined}/>
        </>
    )
}