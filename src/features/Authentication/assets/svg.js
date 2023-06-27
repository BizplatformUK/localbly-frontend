export const Mail = ({ fill, size, height, width, ...props }) => {
    return (
      <svg
        width={size || width || 24}
        height={size || height || 24}
        viewBox="0 0 24 24"
        {...props}
      >
        <g
          fill="none"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        >
          <path d="M12 20.5H7c-3 0-5-1.5-5-5v-7c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v3" />
          <path d="M17 9l-3.13 2.5a3.166 3.166 0 01-3.75 0L7 9M19.21 14.77l-3.539 3.54a1.232 1.232 0 00-.3.59l-.19 1.35a.635.635 0 00.76.76l1.35-.19a1.189 1.189 0 00.59-.3l3.54-3.54a1.365 1.365 0 000-2.22 1.361 1.361 0 00-2.211.01zM18.7 15.28a3.185 3.185 0 002.22 2.22" />
        </g>
      </svg>
    );
  };

  export const Password = ({ fill, size, height, width, ...props }) => {
    return (
      <svg
        width={size || width || 24}
        height={size || height || 24}
        viewBox="0 0 24 24"
        {...props}
      >
        <g fill={fill}>
          <path d="M18.75 8v2.1a12.984 12.984 0 00-1.5-.1V8c0-3.15-.89-5.25-5.25-5.25S6.75 4.85 6.75 8v2a12.984 12.984 0 00-1.5.1V8c0-2.9.7-6.75 6.75-6.75S18.75 5.1 18.75 8z" />
          <path d="M18.75 10.1a12.984 12.984 0 00-1.5-.1H6.75a12.984 12.984 0 00-1.5.1C2.7 10.41 2 11.66 2 15v2c0 4 1 5 5 5h10c4 0 5-1 5-5v-2c0-3.34-.7-4.59-3.25-4.9zM8.71 16.71A1.052 1.052 0 018 17a1 1 0 01-.38-.08 1.032 1.032 0 01-.33-.21A1.052 1.052 0 017 16a1 1 0 01.08-.38 1.155 1.155 0 01.21-.33 1.032 1.032 0 01.33-.21 1 1 0 011.09.21 1.155 1.155 0 01.21.33A1 1 0 019 16a1.052 1.052 0 01-.29.71zm4.21-.33a1.155 1.155 0 01-.21.33A1.052 1.052 0 0112 17a1.033 1.033 0 01-.71-.29 1.155 1.155 0 01-.21-.33A1 1 0 0111 16a1.033 1.033 0 01.29-.71 1.047 1.047 0 011.42 0A1.033 1.033 0 0113 16a1 1 0 01-.08.38zm3.79.33a1.014 1.014 0 01-1.42 0 1.014 1.014 0 010-1.42 1.047 1.047 0 011.42 0c.04.05.08.1.12.16a.556.556 0 01.09.17.636.636 0 01.06.18 1.5 1.5 0 01.02.2 1.052 1.052 0 01-.29.71z" />
        </g>
      </svg>
    );
  }; 

  export const UnLockIcon = ({
    fill,
    filled,
    size,
    height,
    width,
    label,
    ...props
  }) => {
    return (
      <svg
        data-name="Iconly/Curved/Lock"
        xmlns="http://www.w3.org/2000/svg"
        width={size || width || 24}
        height={size || height || 24}
        viewBox="0 0 24 24"
        {...props}
      >
        <g transform="translate(3.5 2)">
          <path
            d="M8.927,3.237A4.562,4.562,0,0,0,0,4.484V6.653"
            transform="translate(3.849 0.75)"
            fill="none"
            stroke={fill}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth={1.5}
          />
          <path
            d="M.5,0V2.221"
            transform="translate(7.91 12.156)"
            fill="none"
            stroke={fill}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth={1.5}
          />
          <path
            d="M7.66,0C1.915,0,0,1.568,0,6.271s1.915,6.272,7.66,6.272,7.661-1.568,7.661-6.272S13.406,0,7.66,0Z"
            transform="translate(0.75 6.824)"
            fill="none"
            stroke={fill}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth={1.5}
          />
        </g>
      </svg>
    );
  };

 
  export const LockIcon = ({
    fill,
    filled,
    size,
    height,
    width,
    label,
    ...props
  }) => {
    return (
      <svg
        data-name="Iconly/Curved/Lock"
        xmlns="http://www.w3.org/2000/svg"
        width={size || width || 24}
        height={size || height || 24}
        viewBox="0 0 24 24"
        {...props}
      >
        <g
          fill="none"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={1.5}
        >
          <path
            data-name="Stroke 1"
            d="M16.471 9.403V7.25a4.561 4.561 0 00-9.121-.016v2.169"
          />
          <path data-name="Stroke 3" d="M11.91 14.156v2.221" />
          <path
            data-name="Stroke 5"
            d="M11.91 8.824c-5.745 0-7.66 1.568-7.66 6.271s1.915 6.272 7.66 6.272 7.661-1.568 7.661-6.272-1.921-6.271-7.661-6.271z"
          />
        </g>
      </svg>
    );
  };