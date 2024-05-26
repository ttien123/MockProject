const IconDeny = ({ width = 13, height = 13 }: { width?: number; height?: number }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 13 13" fill="none">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.5 0.25C3.04375 0.25 0.25 3.04375 0.25 6.5C0.25 9.95625 3.04375 12.75 6.5 12.75C9.95625 12.75 12.75 9.95625 12.75 6.5C12.75 3.04375 9.95625 0.25 6.5 0.25ZM9.625 8.74375L8.74375 9.625L6.5 7.38125L4.25625 9.625L3.375 8.74375L5.61875 6.5L3.375 4.25625L4.25625 3.375L6.5 5.61875L8.74375 3.375L9.625 4.25625L7.38125 6.5L9.625 8.74375Z"
                fill="#E74C3C"
            />
        </svg>
    );
};

export default IconDeny;
