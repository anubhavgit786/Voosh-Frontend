import React from 'react'
import { BallTriangle } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-75">
        <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#2563EB"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
    </div>
  )
}

export default Loader
