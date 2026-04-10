'use client'
import { set } from 'mongoose'
import {useState} from 'react'

const PRIORITY_CLASS = {low: "badge--low", medium: "badge--medium", high: "badge--high"}
const STATUS_CLASS = {todo: "badge--todo", inprogress: "badge--inprogress", done: "badge--done"}
const STATUS_LABEL = {todo: "To Do", inprogress: "In Progress", done: "Done"}

export default function TaskCard({task, onUpdate, onDelete}){
    const [editing, setEditing] = useState(false)
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
        try{
            const res = await fetch(`api/tasks${task._id}`, {
                method: "DELETE"
            })
            const json = await res.json()
            if(json.success){
                onDelete(task._id)
                console.log("Task successfully deleted:", json.message)
            }
        }catch(err){
            console.error("Error deleting task:", err)
        }
    }
    return(
        <div>TaskCard</div>
    )
}

