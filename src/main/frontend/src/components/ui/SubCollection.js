export function SubCollection(props) {
    const {title, children} = props;
    return (
        <>
            <div className="mt-3 py-2">
                <h6 className="bg-primary text-white">{title}</h6>
                <div className="px-5">
                    {children}
                </div>
            </div>
        </>
    )
}