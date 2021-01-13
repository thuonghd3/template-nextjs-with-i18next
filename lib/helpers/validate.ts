/* eslint-disable */
import { useCallback } from 'react';
import { OptionalObjectSchema } from 'yup/lib/object';

export const useYupValidationResolver = (
    validationSchema: OptionalObjectSchema<any>,
): ((data: any) => Promise<any>) =>
    useCallback(
        async (data) => {
            try {
                const values = await validationSchema.validate(data, {
                    abortEarly: false,
                });

                return {
                    values,
                    errors: {},
                };
            } catch (errors) {
                return {
                    values: {},
                    errors: errors.inner.reduce(
                        (
                            allErrors: Record<string, string>,
                            currentError: {
                                path: string;
                                type: string;
                                message: string;
                            },
                        ) => ({
                            ...allErrors,
                            [currentError.path]: currentError.message,
                        }),
                        {},
                    ),
                };
            }
        },
        [validationSchema],
    );
