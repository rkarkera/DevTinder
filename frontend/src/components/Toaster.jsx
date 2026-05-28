

const Toaster = ({msg}) => {
  return (
    <div className="toast toast-top toast-center fixed z-50">
          <div className="alert alert-info">
            <span>{msg}</span>
          </div>
        </div>
  )
}

export default Toaster