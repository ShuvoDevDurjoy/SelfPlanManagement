import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div>
          <ul className='flex flex-col gap-2'>
              <li className='bg-black/10 p-1'>
                  <Link href="/daily_plan">Daily Plan</Link>
              </li>
              <li className='bg-black/10 p-1'>
                  <Link href="/missions">Missions</Link>
              </li>
              <li className='bg-black/10 p-1'>
                  <Link href="plans">Plans</Link>
              </li>
      </ul>
    </div>
  )
}

export default Sidebar
