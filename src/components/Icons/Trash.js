import pen from './img/pen.png'
import confirm from './img/confirmed.png'
import cancel from './img/cancel.png'

export const Trash = ({ size = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <rect width="24" height="24" opacity="0" />
      <path
        fill={"currentColor"}
        d="M21 6h-5V4.33A2.42 2.42 0 0 0 13.5 2h-3A2.42 2.42 0 0 0 8 4.33V6H3a1 1 0 0 0 0 2h1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8h1a1 1 0 0 0 0-2zM10 4.33c0-.16.21-.33.5-.33h3c.29 0 .5.17.5.33V6h-4zM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8h12z"
      />
    </svg>
  );
};
export const Pen = ({ size = 24 }) => {

  return <img src={pen}
    width={size}
    height={size}></img>
}

export const Confirmed = ({ size = 24 }) => {
  return <img src={confirm}
    width={size}
    height={size}></img>
}

export const Canceled = ({ size = 24 }) => {
  return <img src={cancel}
    width={size}
    height={size}></img>
}