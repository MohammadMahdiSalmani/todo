import React from "react";
import Task from "../Task/Task";
import Button from "../Button/Button";
import Check from "../Check/Check";
import TaskContent from "../TaskContent/TaskContent";
// import Input from "../Input/Input";


import "./Tasks.css"
import axios from "../../axios";

class Tasks extends React.Component {
    state = {
        allTasks: [],
        newValue: {
            id: null,
            newValue: ""
        },
        disableButton: false
    }

    componentDidMount() {
        axios.get("/tasks.json").then((response) => {
            this.setState({ allTasks: response.data })
        })
    }

    componentDidUpdate() {
        axios.get("/tasks.json").then((response) => {
            this.setState({ allTasks: response.data })
        })
    }

    deleteHandler = (id) => {
        axios.delete(`/tasks/${id}.json`)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    editHandler = (id) => {
        axios.put(`/tasks/${id}/readOnly.json`, "false")
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    enterHandler = (id) => {
        axios.put(`/tasks/${id}/readOnly.json`, "true")
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })


        const preValue = { ...this.state.newValue[id] }
        const newValue = JSON.stringify(preValue.newValue)
        const clearedValue = newValue.replace(/  +/g, ' ')
        console.log(clearedValue)

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

    newValueHandler = (event, id) => {
        if (event.currentTarget.textContent.length > 0 && event.currentTarget.textContent.length < 170) {
            const updatedValue = {
                ...this.state.newValue,
            }

            const updatedElement = { ...updatedValue[id] }

            updatedElement.newValue = event.currentTarget.textContent

            updatedValue[id] = updatedElement

            this.setState({ newValue: updatedValue })
        }
    }

    checkHandler = (id) => {
        if (this.state.allTasks[id].check) {
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

    render() {
        const tasks = []

        for (let item in this.state.allTasks) {
            tasks.push({
                id: item,
                value: this.state.allTasks[item],
            })
        }

        return (
            <section>
                <ul>
                    {tasks.map((item) => {
                        return (
                            <Task key={item.id} style={{ borderBottom: item.value.readOnly ? "none" : "3px solid #ffbc1e", borderRadius: item.value.readOnly ? "10px" : "10px 10px 0 0" }}>
                                <TaskContent className="task-content" style={{ textDecoration: item.value.check ? 'line-through' : 'none' }} change={(event) => this.newValueHandler(event, item.id)} contentEditable={!item.value.readOnly}>{item.value.task}</TaskContent>
                                <Check className="check" change={() => this.checkHandler(item.id)} checked={item.value.check} />
                                <div className="controllers">
                                    <Button btnColor="btn-info" controller={() => this.editHandler(item.id)} style={{ display: item.value.readOnly ? 'block' : 'none' }}>Edit</Button>
                                    <Button btnColor="btn-danger" controller={() => this.deleteHandler(item.id)} style={{ display: item.value.readOnly ? 'block' : 'none' }}>Delete</Button>
                                    <Button btnColor="btn-success" controller={() => this.enterHandler(item.id)} style={{ display: item.value.readOnly ? 'none' : 'block' }} disabled={this.state.disableButton}>Enter</Button>
                                </div>
                            </Task>
                        )
                    })}
                </ul>
            </section>
        )
    }
}

export default Tasks