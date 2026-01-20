import React, { ReactNode } from 'react'
import Link from 'next/link'

export type infoBox ={
    heading: string,
    backgroundColor?: string,
    textColor?: string,
    buttonInfo?: {
        text?: string,
        link?: string,
        bgColor?: string},
    children?: ReactNode
}

const InfoBox = ({
    heading,
    backgroundColor="bg-gray-100",
    textColor="text-gray-800",
    buttonInfo,
    children
}:infoBox) => {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
                <h2 className={`${textColor} font-bold`}>{heading}</h2>
                <p className={`${textColor} mt-2 mb-4`}>
                  {children}
                </p>
                <Link
                  href={buttonInfo?.link || "/properties"}
                 className={`inline-block ${buttonInfo?.bgColor} text-white rounded-lg px-4 py-2 hover:opacity-80`}
                >
                  {buttonInfo?.text || "Browse Properties"}
                </Link>
              </div>
  )
}

export default InfoBox
