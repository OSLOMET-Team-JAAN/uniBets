import React, {FC, MutableRefObject, ReactNode} from 'react';
import st from '../../../styles/MyInput.module.css';
// classes gives us to receive styles as object properties

interface Props {
    id?: string;
    name?: string;
    placeholder?: string;
    type?: string;
    value?: string | number;
    onChange?: (e:any) => void;
    children?: ReactNode;
    onClick?: () => void;
    className?: string;
    autoComplete?: "off";
    required?: true;
    ref?: MutableRefObject<HTMLInputElement>
}

const MyInput: FC<Props> =
    ({children, ...props
}) => {

    return (
        <input
            {...props}
            className={st.myInput}
        >
            {children}
        </input>
    );
}

export default MyInput;

// In typeScript we get an error TS7031: Binding element 'children' implicitly has an 'any' type. To reduce amount of type "any" usage
// We decided do not use code below and in that case interface will be implemented
// const MyInput = ({children, ...props}) => {
//     return (
//         <input
//             className={classes.myBtn}
//         >
//             {children}
//         </input>
//     );
// }

// How to build custom buttons component
// https://www.twilio.com/blog/intro-custom-button-component-typescript-react