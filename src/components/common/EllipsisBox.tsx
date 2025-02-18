import { useState } from "react"
import { FaAngleDown } from "react-icons/fa"
import { styled } from "styled-components"
import Button from "./Button"

interface Props {
    children: React.ReactNode
    linelimit: number
}

function EllipsisBox({ children, linelimit }: Props) {
    const [expanded, setExpanded] = useState(false)

    return (
        <EllipsisBoxStyle linelimit={linelimit} $expanded={expanded}>
            <p>{children}</p>
            <div className="toggle">
                <Button size="small" scheme="normal" onClick={() => setExpanded(!expanded)}>
                    {expanded ? "접기" : "펼치기"} <FaAngleDown />
                </Button>
            </div>
        </EllipsisBoxStyle>
    )
}

interface EllipsisBoxStyleProps {
    linelimit: number
    $expanded: boolean
}

const EllipsisBoxStyle = styled.div<EllipsisBoxStyleProps>`
    p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: ${({ linelimit, $expanded }) => $expanded ? 'none' :  linelimit};
        -webkit-box-orient: vertical;
        padding: 20px 0 0 0;
        margin: 0;
    }

    .toggle {
        padding: 10px 0 0 0;
        display: flex;
        justify-content: end;
        svg {
            transform: ${({ $expanded }) => $expanded ? 'rotate(180deg)' : 'rotate(0)' };
        }
        button {
            display: flex;
            align-items: center;
        }

    }
`

export default EllipsisBox