export const Route = (props) => {
    return (
        <div className={ props.className || "Route" }>
            {props.children}
        </div>
    )
}