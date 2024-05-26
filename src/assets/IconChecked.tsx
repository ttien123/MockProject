const IconChecked = ({ width = 13, height = 13 }: { width?: number; height?: number }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 13 13" fill="none">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.5 0.25C3.05 0.25 0.25 3.05001 0.25 6.50001C0.25 9.95002 3.05 12.75 6.5 12.75C9.95 12.75 12.75 9.95002 12.75 6.50001C12.75 3.05001 9.95 0.25 6.5 0.25ZM5.25 9.62502L2.125 6.50001L3.00625 5.61876L5.25 7.85626L9.99375 3.11251L10.875 4.00001L5.25 9.62502Z"
                fill="#2F852D"
            />
        </svg>
    );
};

export default IconChecked;
