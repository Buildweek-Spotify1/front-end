import { useState } from "react"
import * as yup from 'yup'

export const useForm = (init, cb) => {
  const [state, setState] = useState({ ...init })

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    }
    )
  }

  const handleSubmit = e => {
    e.preventDefault()
    cb()
  }

  return [state, handleChange, handleSubmit]
}

export const useFormValidation = (init, formSchema, cb) => {
  const [state, setState] = useState({ ...init })
  const [errors, setErrors] = useState({ ...init })

  const handleChange = e => {
    e.persist()

    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {

        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch((err) => {
        console.log(err);

        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });
    setState({
      ...state,
      [e.target.name]: e.target.value
    }
    )
  }

  const handleSubmit = e => {
    e.preventDefault()
    cb()
    setState({ ...init })
  }

  return [state, errors, handleChange, handleSubmit]
}