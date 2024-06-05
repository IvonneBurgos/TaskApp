import React, { useState } from 'react';
import { View, Text, FlatList, Button, TextInput, Modal, StyleSheet } from 'react-native';
import { useTasks } from '../hooks/useTasks';

const TaskScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [taskDescription, setTaskDescription] = useState('');
  const { tasks, addNewTask} = useTasks();

  const handleAddTask = () => {
    if (taskDescription.trim()) {
      addNewTask(taskDescription);
      setTaskDescription('');
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.description}</Text>}
      />
      <Button title="Add New Task" onPress={() => setModalVisible(true)} />
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TextInput
            value={taskDescription}
            onChangeText={setTaskDescription}
            placeholder="Enter task description"
          />
          <Button title="Add Task" onPress={handleAddTask} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

export default TaskScreen;
