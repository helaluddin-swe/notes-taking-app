

const RateLimiter = () => {
  return (
    <div className="relative">
      <div className="bg-blue-500 text-white h-auto w-200 ml-auto mr-auto z-10 absolute  border p-4 items-center  justify-center top-30 md:left-30">
        <h2> You Attempt too many request</h2>
        <p>You can request 20 times per minutes so, you cannot attemps many time within 60 second</p>
      </div>
    </div>
  )
}

export default RateLimiter
