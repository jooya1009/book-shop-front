import React, { ForwardedRef } from "react";
import styled from "styled-components";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string
    inputType?: "text" | "email" | "password" | "number"
}

const InputText = React.forwardRef(({ placeholder, inputType, onChange, ...props }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    return (
        <InputTextStyle placeholder={placeholder} ref={ref} type={inputType} {...props} onChange={onChange} />
    )
})

const InputTextStyle = styled.input`
    padding: 0.5rem 1rem;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    font-size: 1rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.color.text};
`

export default InputText