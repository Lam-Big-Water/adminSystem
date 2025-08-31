import React from 'react'

const StatusBadge = ({status}) => {
  let color = `--${status.replace("-", "")}`;
  console.log(color)
  return (
    <span className={`whitespace-nowrap py-2 px-4 rounded-2xl border-[1px] border-[var(--color-border)] text-[var(${color})]`}>
      {status}
    </span>
  )
}

export default StatusBadge