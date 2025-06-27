import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { AlertTriangle, CheckCircle2Icon, PopcornIcon } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export default function FlashMessages() {
    const [visible, setVisible] = useState(true);
    const { flash, errors } = usePage<PageProps>().props;
    const formErrors = Object.keys(errors).length;

    useEffect(() => {
        setVisible(true);
    }, [flash, errors]);

    return (
        <div className="w-full px-8 mt-4">
            {flash?.success && visible && (
                <Alert className="border-green-200 bg-green-50 text-green-800">
                    <CheckCircle2Icon />
                    <AlertTitle>{flash.success}</AlertTitle>
                </Alert>
            )}
            {flash?.error && visible && (
                <Alert className="border-red-200 bg-red-50 text-red-800">
                    <AlertTriangle />
                    <AlertTitle>{flash.error}</AlertTitle>
                </Alert>
            )}
            


            {/* <Alert>
                <PopcornIcon />
                <AlertTitle>
                    This Alert has a title and an icon. No description.
                </AlertTitle>
            </Alert>
            <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Unable to process your payment.</AlertTitle>
                <AlertDescription>
                    <p>Please verify your billing information and try again.</p>
                    <ul className="list-inside list-disc text-sm">
                        <li>Check your card details</li>
                        <li>Ensure sufficient funds</li>
                        <li>Verify billing address</li>
                    </ul>
                </AlertDescription>
            </Alert> */}
        </div>
        // <>
        //   {flash.success && visible && (
        //     <Alert
        //       variant="success"
        //       message={flash.success}
        //       onClose={() => setVisible(false)}
        //     />
        //   )}
        //   {flash.error && visible && (
        //     <Alert
        //       variant="error"
        //       message={flash.error}
        //       onClose={() => setVisible(false)}
        //     />
        //   )}
        //   {formErrors > 0 && visible && (
        //     <Alert
        //       variant="error"
        //       message={'There are ' + formErrors + ' form errors.'}
        //       onClose={() => setVisible(false)}
        //     />
        //   )}
        // </>
    );
}
