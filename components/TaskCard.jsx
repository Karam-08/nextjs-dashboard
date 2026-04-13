'use client'
import {set} from 'mongoose'
import {useState} from 'react'

const priorityBadge = {
    low: "bg-emerald-100 text-emerald-800 dark:bg-emearld-900/40 dark:text-emerald-300",
    medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    high: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
}

const statusBadge = {
    todo: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300",
    "in-progress": "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    done: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
}

const STATUS_LABEL = {todo: "To Do", "in-progress": "In Progress", done: "Done"}

const inputCSS = "w-full px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:broder-teansparent transition"

export default function TaskCard({task, onUpdate, onDelete}){
    const [editing, setEditing] = useState(true)
    const [saving, setSaving] = useState(false)
    const [form, setForm] = useState({
        title: task.title,
        description: task.description || "",
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate ? task.dueDate.slice(0, 10) : ""
    })

    const handleChange = (e) => setForm({...form, [e.target.name] : e.target.value})

    const handleSave = async () =>{
        setSaving(true)
        try{
            const payload = {...form}
            if(!payload.dueDate) payload.dueDate = null

            const res = await fetch(`api/tasks${task._id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload)
            })
            const json = await res.json()
            if(json.success){
                onUpdate(json.data)
                setEditing(false)
            }
        }catch(err){
            console.error("Error updating task:", err)
        }finally{
            setSaving(false)
        }
    }

    const handleDelete = async () =>{
        if(!confirm("Delete this task?")) return
        await fetch(`api/tasks/${task._id}`, {method: "DELETE"})
        onDelete(task._id)
    }

    const dueLabel = task.dueDate
        ? new Date(task.dueDate).toLocaleDateString("en-us", {month: "short", day: "numeric", year: "numeric"}) : null
    const isOverdue = task.dueDate && task.status !== "done" && new Date(task.dueDate) < new Date()

    if(editing){
        return(<div>Condition Met</div>)
    }

    return(
        <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between gap-2">
                <span className="font-semibold uppercase tracking-wide px-2 py-0 5 rounded-full">
                    
                </span>
            <button className="text"></button></div>
        </div>
    )
}

