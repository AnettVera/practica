import { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({ a: '', b: '' })
  const [status, setStatus] = useState({ loading: false, message: '' })
  const [result, setResult] = useState('')

  const baseUrl = `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}${import.meta.env.VITE_API_BASE}`

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, message: '' })

    try {
      const response = await fetch(`${baseUrl}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          a: formData.a,
          b: formData.b,
        }),
      })

      if (!response.ok) {
        throw new Error('Error al enviar los datos')
      }

      const data = await response.text()

      setResult(data.result) 
      setStatus({ loading: false, message: data })

    } catch (error) {
      setStatus({ loading: false, message: error.message })
    }
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center">Formulario</h1>

      <form onSubmit={handleSubmit} className="card p-4">
        <input
          className="form-control mb-3"
          type="number"
          name="a"
          placeholder="Number 1"
          value={formData.a}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          type="number"
          name="b"
          placeholder="Number 2"
          value={formData.b}
          onChange={handleChange}
        />

        <button className="btn btn-primary w-100" type="submit">
          {status.loading ? "Cargando..." : "Enviar"}
        </button>
      </form>

      {result && (
        <div className="alert alert-success text-center mt-3">
          {result}
        </div>
      )}

      {status.message && (
        <p className="text-danger mt-3 text-center">{status.message}</p>
      )}
    </div>
  )
}

export default App
