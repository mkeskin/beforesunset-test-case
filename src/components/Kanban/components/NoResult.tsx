import styles from '../Kanban.module.scss'

const NoResult = () => {
  return (
    <div className={styles.noresult}>
      <svg
        width="251"
        height="282"
        viewBox="0 0 251 282"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          width="222"
          height="268"
          rx="2.5"
          fill="#F5F9FD"
          stroke="#DCDFE2"
        />
        <rect x="18" y="15" width="187" height="69" fill="#e9ebed" />
        <rect x="27" y="33" width="134" height="13" fill="#d3d9df" />
        <rect x="27" y="54" width="111" height="13" fill="#d3d9df" />
        <rect x="18" y="96" width="187" height="69" fill="#e9ebed" />
        <rect x="27" y="114" width="134" height="13" fill="#d3d9df" />
        <rect x="27" y="135" width="111" height="13" fill="#d3d9df" />
        <rect x="18" y="177" width="187" height="69" fill="#e9ebed" />
        <rect x="27" y="195" width="134" height="13" fill="#d3d9df" />
        <rect x="27" y="216" width="111" height="13" fill="#d3d9df" />
        <circle cx="216.5" cy="247.5" r="34.5" fill="#ea2027" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M215.5 252.5H218.5V255.5H215.5V252.5ZM215.5 240.5H218.5V249.5H215.5V240.5ZM216.985 233C208.705 233 202 239.72 202 248C202 256.28 208.705 263 216.985 263C225.28 263 232 256.28 232 248C232 239.72 225.28 233 216.985 233ZM217 260C210.37 260 205 254.63 205 248C205 241.37 210.37 236 217 236C223.63 236 229 241.37 229 248C229 254.63 223.63 260 217 260Z"
          fill="white"
        />
      </svg>
      <h1 role="heading">There is no board to show</h1>
    </div>
  )
}

NoResult.displayName = 'Kanban No Result'

export default NoResult
