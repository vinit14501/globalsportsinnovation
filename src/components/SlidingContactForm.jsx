import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { useForm } from "react-hook-form"
import emailjs from "@emailjs/browser"

// Initialize EmailJS with the public key
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const RECIPIENT_EMAIL = import.meta.env.VITE_RECIPIENT_EMAIL

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY)

const Notification = ({ message, isSuccess }) => (
  <div
    className={`mb-4 p-4 rounded-lg ${
      isSuccess
        ? "bg-green-50 border border-green-200"
        : "bg-red-50 border border-red-200"
    }`}
  >
    <h4
      className={`font-medium ${isSuccess ? "text-green-800" : "text-red-800"}`}
    >
      {isSuccess ? "Success!" : "Error"}
    </h4>
    <p className={`text-sm ${isSuccess ? "text-green-700" : "text-red-700"}`}>
      {message}
    </p>
  </div>
)

const InputField = ({
  label,
  type,
  register,
  name,
  error,
  placeholder,
  validation,
}) => (
  <div className="mb-6">
    <label className="block mb-2 text-sm font-medium font-serif text-[#121212] dark:text-gray-300">
      {label}
    </label>
    <input
      {...register(name, validation)}
      type={type}
      placeholder={placeholder}
      className={`w-full px-4 py-3 text-[#121212] bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-blue-400 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
  </div>
)

const SlidingContactForm = ({ isOpen, onClose }) => {
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    isSuccess: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [isOpen, onClose])

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      // Verify that environment variables are available
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        throw new Error("EmailJS configuration is missing")
      }

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: data.fullName,
        from_email: data.email,
        message: data.message,
        to_email: RECIPIENT_EMAIL,
        reply_to: data.email,
      })

      setNotification({
        show: true,
        message:
          "Your message has been sent successfully. We'll get back to you soon.",
        isSuccess: true,
      })
      reset()
      setTimeout(onClose, 3000) // Close the form after successful submission
    } catch (error) {
      console.error("Email sending failed:", error)
      setNotification({
        show: true,
        message: "Failed to send message. Please try again later.",
        isSuccess: false,
      })
    } finally {
      setIsSubmitting(false)
      setTimeout(
        () => setNotification({ show: false, message: "", isSuccess: true }),
        5000
      )
    }
  }

  const handleLinkedInClick = () => {
    window.open("https://www.linkedin.com/company/your-company", "_blank")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-[#121212] bg-opacity-50 z-50 flex justify-end">
      <div
        className="w-full sm:w-96 bg-white dark:bg-[#121212] shadow-lg h-full overflow-y-auto p-8 transform transition-transform duration-300 ease-in-out"
        style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#121212] hover:text-[#121212] dark:text-gray-300 dark:hover:text-gray-100"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-3xl font-bold font-serif text-[#121212] dark:text-white mb-4">
          Get in Touch
        </h2>
        <p className="text-xl font-bold font-serif text-[#2c439c] mb-8">
          We&apos;d love to hear from you
        </p>

        {notification.show && (
          <Notification
            message={notification.message}
            isSuccess={notification.isSuccess}
          />
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Full Name"
            type="text"
            name="fullName"
            placeholder="John Doe"
            register={register}
            error={errors.fullName}
            validation={{
              required: "Full name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters long",
              },
            }}
          />
          <InputField
            label="Email Address"
            type="email"
            name="email"
            placeholder="john@example.com"
            register={register}
            error={errors.email}
            validation={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
          />
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium font-serif text-[#121212] dark:text-gray-300">
              Message
            </label>
            <textarea
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters long",
                },
              })}
              className={`w-full px-4 py-3 text-[#121212] bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-blue-400 ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
              rows="5"
              placeholder="Your message here..."
            ></textarea>
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">
                {errors.message.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#2c439c] text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-6 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
        <div className="flex justify-center">
          <button
            onClick={handleLinkedInClick}
            className="bg-[#2c439c] text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SlidingContactForm
