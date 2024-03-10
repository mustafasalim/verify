import { useState, useRef, useEffect } from "react"
import { AiOutlineSafetyCertificate } from "react-icons/ai"

function Verify() {
  const [code, setCode] = useState<any>([])
  const [success, setSuccess] = useState<any>(false)
  const [auth, setAuth] = useState<any>(null)
  const [inputValue, setInputValue] = useState<string>("")

  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const handleChange = (index: number, value: string) => {
    const newCode = [...code]
    newCode[index] = value
    if (index < 3 && value !== "") {
      // Bir sonraki input alanına geçiş yap
      refs[index + 1].current?.focus()
    }
    setCode(newCode)
  }

  const handleKeyDown = (index: any, value: any) => {
    const newItem = [...code]
    //input alanındaki deger silindiginde diziden o elemanı kaldır
    newItem.splice(index, 1)

    if (value === "Backspace" && value !== "") {
      // Bir önceki input alanına geç
      setTimeout(() => {
        refs[index - 1]?.current?.focus()
      }, 10)

      // yeni deger
      setCode(newItem)
    }
  }
  useEffect(() => {
    const isValidCode = () => {
      return code.join("") === "1234"
    }
    if (code.length === 4) {
      setSuccess(isValidCode())
      setAuth(isValidCode())
    } else if (code.length === 1) {
      setAuth(null)
    }
  }, [code])

  console.log(auth)

  return (
    <>
      <div
        className={`flex flex-col items-center justify-center p-6 border  ${
          auth === false && "!border-red-500 transition-colors annim"
        } rounded-md gap-y-2`}
      >
        <div className="w-full flex flex-col gap-y-2">
          {success ? (
            <div className="flex gap-x-2 items-center justify-center text-[20px]">
              <AiOutlineSafetyCertificate className="text-green-500  text-[25px]" />
              <span>verification successful</span>(
              <span className="font-bold">{...code}</span>)
            </div>
          ) : (
            <>
              <div className="flex flex-col ">
                <h1 className="font-bold ">Verify Account</h1>
                <span>
                  Come to ms*******@gmail.com and enter the verification code
                </span>
              </div>
              <div className="flex gap-x-2">
                {refs.map((ref, index) => (
                  <input
                    key={index}
                    onKeyDown={(e: any) => handleKeyDown(index, e.key)}
                    placeholder="0"
                    onChange={(e) => handleChange(index, e.target.value)}
                    ref={ref}
                    className={`outline-none border focus:border-blue-500 ${
                      auth === false && "!border-red-500 transition-colors"
                    } w-10 h-10 rounded-md text-center font-semibold`}
                    type="number"
                  />
                ))}
              </div>

              <div className="w-full text-red-500">
                {auth === false ? "entered code incorrect" : ""}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Verify
