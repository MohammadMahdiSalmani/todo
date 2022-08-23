import React, { useState, useEffect } from "react";
import Task from "../Task/Task";
import Button from "../Button/Button";
import Check from "../Check/Check";
import TaskContent from "../TaskContent/TaskContent";


import "./Tasks.css"
import axios from "../../axios";

const Tasks = () => {
    const [allTasks, setAllTasks] = useState([])
    const [newValue, setNewValue] = useState({ id: null, newValue: "" })

    useEffect(() => {
        const sendRequest = async () => {
            const response = await axios.get("/tasks.json")
            setAllTasks(response.data)
        }

        sendRequest()
    }, [allTasks, newValue])

    const deleteHandler = (id) => {
        axios.delete(`/tasks/${id}.json`)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const editHandler = (id) => {
        axios.put(`/tasks/${id}/readOnly.json`, "false")
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const enterHandler = (id) => {
        axios.put(`/tasks/${id}/readOnly.json`, "true")
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })


        const preValue = { ...newValue[id] }
        const newVal = JSON.stringify(preValue.newValue)
        const clearedValue = newVal.replace(/  +/g, ' ')

        if (clearedValue) {
            axios.put(`/tasks/${id}/task.json`, clearedValue)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    const newValueHandler = (event, id) => {
        if (event.currentTarget.textContent.length > 0 && event.currentTarget.textContent.length < 170) {
            const updatedValue = {
                ...newValue,
            }

            const updatedElement = { ...updatedValue[id] }

            updatedElement.newValue = event.currentTarget.textContent

            updatedValue[id] = updatedElement

            setNewValue(updatedValue)
        }
    }

    const checkHandler = (id) => {
        if (allTasks[id].check) {
            axios.put(`/tasks/${id}/check.json`, "false")
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        }
        else {
            axios.put(`/tasks/${id}/check.json`, "true")
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    const tasks = []

    for (let item in allTasks) {
        tasks.push({
            id: item,
            value: allTasks[item],
        })
    }

    let result;

    tasks.length > 0 ? 
    result = tasks.map((item) => {
        return (
            <Task key={item.id} style={{ borderBottom: item.value.readOnly ? "none" : "3px solid #ffbc1e", borderRadius: item.value.readOnly ? "10px" : "10px 10px 0 0" }}>
                <TaskContent className="task-content" style={{ textDecoration: item.value.check ? 'line-through' : 'none' }} change={(event) => newValueHandler(event, item.id)} contentEditable={!item.value.readOnly}>{item.value.task}</TaskContent>
                <Check className="check" change={() => checkHandler(item.id)} checked={item.value.check} />
                <div className="controllers">
                    <Button btnColor="btn-info" controller={() => editHandler(item.id)} style={{ display: item.value.readOnly ? 'block' : 'none' }}>Edit</Button>
                    <Button btnColor="btn-danger" controller={() => deleteHandler(item.id)} style={{ display: item.value.readOnly ? 'block' : 'none' }}>Delete</Button>
                    <Button btnColor="btn-success" controller={() => enterHandler(item.id)} style={{ display: item.value.readOnly ? 'none' : 'block' }}>Enter</Button>
                </div>
            </Task>
        )
    }) : result = "There is not any Task to do"

    return (
        <section>
            <ul>
                {result}
            </ul>
        </section>
    )
}

export default Tasks