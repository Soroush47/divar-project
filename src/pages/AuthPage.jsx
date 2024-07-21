import * as stylex from "@stylexjs/stylex";

import SendOtpForm from "components/templates/SendOtpForm";
import CheckOtpForm from "components/templates/CheckOtpForm";
import { useStore } from "src/hooks/useStore";

const styles = stylex.create({
    authBox: {
        borderRadius: "6px",
        minHeight: "max-content",
        maxWidth: "500px",
        padding: "25px",
        boxShadow: "0px 0px 10px 1px #dfdfdf",
        margin: "auto",
        marginTop: "10px",
        marginBottom: "150px",
    },
});

function AuthPage() {
    const showCheck = useStore(state => state.showCheck);

    return (
        <div {...stylex.props(styles.authBox)}>
            {showCheck ? <CheckOtpForm /> : <SendOtpForm />}
        </div>
    );
}

export default AuthPage;
