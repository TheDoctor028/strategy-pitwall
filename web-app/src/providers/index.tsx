import {WithChildren} from "../models/common.ts";
import {ModalProvider} from "./ModalProvider.tsx";
import {GraphQLProvider} from "./GraphQLProvider.tsx";

export function Providers({ children }: WithChildren) {

    return (
        <>
            <GraphQLProvider>
                <ModalProvider>
                    {children}
                </ModalProvider>
            </GraphQLProvider>
        </>
    );
}
