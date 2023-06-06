import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import LinkTree from "@/components/LinkTree"
import axios from "axios"
import Link from "next/link"

const handle = () => {
  const router = useRouter()
  const [data, setData] = useState({})
  const [userFound, setUserFound] = useState(false)
  useEffect(() => {
    if (router.query?.handle) {
      axios
        .get(`http://localhost:8080/get/${router.query.handle}`)
        .then((res) => {
          const data = res.data
          {
            console.log(data)
          }
          if (data.status == "error") {
            return toast.error(data.error)
          }
          if (data.status == "success") {
            setData(data.userData)
            setUserFound(true)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [router.query.handle])
  if (!userFound) {
    return (
      <div className="flex  flex-col justify-center items-center h-screen">
        <div className="not-found px-2 ">
          <h1 className="font-bold text-lg">User Not Found 😞</h1>

          <p>
            If you're looking for a page, double check the spelling and try
            again.
          </p>
        </div>
        Create your Own{" "}
        <Link
          className="bg-indigo-500 px-3 ml-2 text-white hover:bg-indigo-400 transition-all duration-500 text-left"
          href="apply"
        >
          LinkTree
        </Link>
      </div>
    )
  }
  return (
    <>
      <LinkTree data={data} />
    </>
  )
}

export default handle