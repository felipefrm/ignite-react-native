import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const titleAlreadyExist = tasks.find(task => task.title === newTaskTitle)

    if (titleAlreadyExist) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      )
      return
    }

    const newTask: Task = {
      id: new Date().getTime(),
      done: false,
      title: newTaskTitle
    }

    setTasks([...tasks, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done
        }
      }

      return task
    })

    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: () => setTasks(tasks.filter(task => task.id !== id))
        }
      ]
    )
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const titleAlreadyExist = tasks.find(task => task.title === taskNewTitle)

    if (titleAlreadyExist) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      )
      return
    }

    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          title: taskNewTitle
        }
      }

      return task
    })

    setTasks(updatedTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})