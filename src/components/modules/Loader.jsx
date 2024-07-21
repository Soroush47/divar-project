import * as stylex from "@stylexjs/stylex";

const rotation = stylex.keyframes({
    "0%": {
        transform: "rotate(0deg)",
    },
    "100%": {
        transform: "rotate(360deg)",
    },
});

const styles = stylex.create({
    container: {
        position: "absolute",
        textAlign: "center",
        top: "250px",
        left: "50%",
        transform: "translate(-50%, 0)",
    },
    loader: {
        width: "45px",
        height: "45px",
        border: "5px solid #ffc5c5",
        borderBottomColor: "#a62626",
        borderRadius: "50%",
        display: "inline-block",
        boxSizing: "border-box",
        animation: `${rotation} 1s linear infinite`,
    },
});

function Loader() {
    return (
        <div {...stylex.props(styles.container)}>
            <span {...stylex.props(styles.loader)} />
        </div>
    );
}

export default Loader;
