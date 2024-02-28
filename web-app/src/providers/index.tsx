import {WithChildren} from "../models/common.ts";
import {ModalProvider} from "./ModalProvider.tsx";

export function Providers({ children }: WithChildren) {

    return (
        <>
            <ModalProvider>
                {children}
            </ModalProvider>
        </>
    );
}
