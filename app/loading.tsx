"use client"

import ClipLoader from "react-spinners/ClipLoader"

const cssOverride = {
  display: "block",
  margin: "100px auto",
};

const loading = ({loading}:{loading:boolean}) => {
  return (
   <ClipLoader
     size={200}
     color={"#3b82f6"}
     loading={loading}
     aria-label="Loading Spinner"
     cssOverride={cssOverride}
   />
  )
}

export default loading
