/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Person } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PersonUpdateFormInputValues = {
    image?: string;
    boxColour?: string;
    physicalSignal?: string;
    socialIdentity?: string;
    emotion?: string;
    socialRelation?: string;
    environment?: string;
    caption?: string;
};
export declare type PersonUpdateFormValidationValues = {
    image?: ValidationFunction<string>;
    boxColour?: ValidationFunction<string>;
    physicalSignal?: ValidationFunction<string>;
    socialIdentity?: ValidationFunction<string>;
    emotion?: ValidationFunction<string>;
    socialRelation?: ValidationFunction<string>;
    environment?: ValidationFunction<string>;
    caption?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PersonUpdateFormOverridesProps = {
    PersonUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    boxColour?: PrimitiveOverrideProps<TextFieldProps>;
    physicalSignal?: PrimitiveOverrideProps<TextAreaFieldProps>;
    socialIdentity?: PrimitiveOverrideProps<TextAreaFieldProps>;
    emotion?: PrimitiveOverrideProps<TextFieldProps>;
    socialRelation?: PrimitiveOverrideProps<TextAreaFieldProps>;
    environment?: PrimitiveOverrideProps<TextFieldProps>;
    caption?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PersonUpdateFormProps = React.PropsWithChildren<{
    overrides?: PersonUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    person?: Person;
    onSubmit?: (fields: PersonUpdateFormInputValues) => PersonUpdateFormInputValues;
    onSuccess?: (fields: PersonUpdateFormInputValues) => void;
    onError?: (fields: PersonUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PersonUpdateFormInputValues) => PersonUpdateFormInputValues;
    onValidate?: PersonUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PersonUpdateForm(props: PersonUpdateFormProps): React.ReactElement;
