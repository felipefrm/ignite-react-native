import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';

import { Task } from "./TasksList";

import trashIcon from '../assets/icons/trash/trash.png'

interface TaskItemProps {
  index: number;
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
}

export function TaskItem({
  index,
  task,
  toggleTaskDone,
  removeTask,
  editTask }: TaskItemProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [title, setTitle] = useState(task.title)

  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setIsEditingTitle(true)
  }

  function handleCancelEditing() {
    setIsEditingTitle(false)
    setTitle(task.title)
  }

  function handleSubmitEditing() {
    editTask(task.id, title)
    setIsEditingTitle(false)
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditingTitle) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditingTitle])

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={title}
            editable={isEditingTitle}
            onChangeText={setTitle}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isEditingTitle ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={20} color="#B2B2B2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditing}
          >
            <Icon name="edit-2" size={18} color="#B2B2B2" />
          </TouchableOpacity>
        )}

        <View
          style={styles.iconsDivider}
        />

        <TouchableOpacity
          testID={`trash-${index}`}
          disabled={isEditingTitle}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} style={{ opacity: isEditingTitle ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24
  },
  iconsDivider: {
    paddingVertical: 10,
    margin: 10,
    borderLeftColor: '#B2B2B2',
    borderLeftWidth: 0.7,
    opacity: 0.8,
  }
})