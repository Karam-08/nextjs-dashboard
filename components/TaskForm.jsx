'use client'
import {useState} from 'react'

const EMPTY = {title: "", description: "", status: "todo", priority: "medium", dueDate: ""}
// Form Placeholders

const inputCSS = "w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focusLoutline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"

export default function TaskForm({onCreated}){
    const [form, setForm] = useState(EMPTY)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleChange = (e) => setForm({...form, [e.target.name] : e.target.value})
    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        setError("")
        try{
            const payload = {...form}
            if(!payload.dueDate) delete payload.dueDate
            const res = await fetch('api/tasks', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload)
            })
            const json = await res.json()
            if(!json.success) throw new Error(json.error)
                setForm(EMPTY)
                onCreated(json.data)
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl p-5 mb-8 shadow-sm"
        >
            <h2>Add a New Task</h2>
            {error && (
                <p className="text-red-600 dark:text-red-400 text-sm mb-3">{error}</p>
            )}

            <div className="mb-3">
                <input
                    name='description'
                    placeholder='Description (optional)'
                    value={form.description}
                    onChange={handleChange}
                    rows={2}
                    className={inputCSS}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <select name="status" value={form.status} onChange={handleChange} className={inputCSS}>
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                </select>
                <select name="priority" value={form.priority} onChange={handleChange} className={inputCSS}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <input
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleChange}
                    className={inputCSS}
                />
            </div>

            <button
                type='submit'
                disabled={loading}
                className='px-4 py-3 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white disabled:opacity-50 disabled:cursor-not-allowed transition'
            >
                {loading ? "Adding..." : "Add Task"}
            </button>
        </form>
    )
}

