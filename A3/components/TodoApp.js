import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, Platform } from 'react-native';
import TextInputComponent from './TextInputComponent';
import FlatListComponent from './FlatListComponent';
import TouchableOpacityComponent from './TouchableOpacityComponent';
import ModalComponent from './ModalComponent';
import ButtonComponent from './ButtonComponent';

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed'
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [editText, setEditText] = useState('');

  // Adicionar nova tarefa
  const addTask = () => {
    if (newTaskText.trim() === '') {
      Alert.alert('Erro', 'Digite o texto da tarefa');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      text: newTaskText.trim(),
      completed: false,
      createdAt: new Date(),
    };

    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  // Marcar tarefa como concluída/pendente
  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  // Remover tarefa
  const removeTask = (taskId) => {
    if (Platform.OS === 'web') {
      // Para web, usar modal customizado
      setTaskToDelete(taskId);
      setDeleteModalVisible(true);
    } else {
      // Para mobile, usar Alert nativo
      Alert.alert(
        'Confirmar exclusão',
        'Tem certeza que deseja excluir esta tarefa?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { 
            text: 'Excluir', 
            style: 'destructive',
            onPress: () => confirmDelete(taskId)
          }
        ]
      );
    }
  };

  // Confirmar exclusão
  const confirmDelete = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setDeleteModalVisible(false);
    setTaskToDelete(null);
  };

  // Cancelar exclusão
  const cancelDelete = () => {
    setDeleteModalVisible(false);
    setTaskToDelete(null);
  };

  // Abrir modal de edição
  const openEditModal = (task) => {
    setEditingTask(task);
    setEditText(task.text);
    setModalVisible(true);
  };

  // Salvar edição
  const saveEdit = () => {
    if (editText.trim() === '') {
      Alert.alert('Erro', 'Digite o texto da tarefa');
      return;
    }

    setTasks(tasks.map(task => 
      task.id === editingTask.id 
        ? { ...task, text: editText.trim() }
        : task
    ));

    setModalVisible(false);
    setEditingTask(null);
    setEditText('');
  };

  // Cancelar edição
  const cancelEdit = () => {
    setModalVisible(false);
    setEditingTask(null);
    setEditText('');
  };

  // Filtrar tarefas
  const getFilteredTasks = () => {
    switch (filter) {
      case 'pending':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  };

  // Renderizar item da lista
  const renderTaskItem = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacityComponent
        style={styles.checkbox}
        onPress={() => toggleTask(item.id)}
      >
        <View style={[
          styles.checkboxInner,
          item.completed && styles.checkboxCompleted
        ]}>
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacityComponent>

      <Text style={[
        styles.taskText,
        item.completed && styles.taskTextCompleted
      ]}>
        {item.text}
      </Text>

      <View style={styles.taskActions}>
        <TouchableOpacityComponent
          style={styles.editButton}
          onPress={() => openEditModal(item)}
        >
          <Text style={styles.editButtonText}>✏️</Text>
        </TouchableOpacityComponent>

        <TouchableOpacityComponent
          style={styles.deleteButton}
          onPress={() => removeTask(item.id)}
        >
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacityComponent>
      </View>
    </View>
  );

  const filteredTasks = getFilteredTasks();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas</Text>

      {/* Campo de entrada e botão adicionar */}
      <View style={styles.inputContainer}>
        <TextInputComponent
          placeholder="Digite uma nova tarefa..."
          value={newTaskText}
          onChangeText={setNewTaskText}
          style={styles.input}
          onSubmitEditing={addTask}
        />
        <ButtonComponent
          title="Adicionar"
          onPress={addTask}
          style={styles.addButton}
        />
      </View>

      {/* Filtros */}
      <View style={styles.filterContainer}>
        <ButtonComponent
          title="Todas"
          onPress={() => setFilter('all')}
          variant={filter === 'all' ? 'primary' : 'secondary'}
          style={styles.filterButton}
        />
        <ButtonComponent
          title="Pendentes"
          onPress={() => setFilter('pending')}
          variant={filter === 'pending' ? 'primary' : 'secondary'}
          style={styles.filterButton}
        />
        <ButtonComponent
          title="Concluídas"
          onPress={() => setFilter('completed')}
          variant={filter === 'completed' ? 'primary' : 'secondary'}
          style={styles.filterButton}
        />
      </View>

      {/* Lista de tarefas */}
      <View style={styles.listContainer}>
        {filteredTasks.length === 0 ? (
          <Text style={styles.emptyText}>
            {filter === 'all' 
              ? 'Nenhuma tarefa adicionada ainda'
              : filter === 'pending'
              ? 'Nenhuma tarefa pendente'
              : 'Nenhuma tarefa concluída'
            }
          </Text>
        ) : (
          <FlatListComponent
            data={filteredTasks}
            renderItem={renderTaskItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>

      {/* Modal de edição */}
      <ModalComponent
        visible={modalVisible}
        onRequestClose={cancelEdit}
      >
        <Text style={styles.modalTitle}>Editar Tarefa</Text>
        <TextInputComponent
          value={editText}
          onChangeText={setEditText}
          style={styles.modalInput}
          multiline
        />
        <View style={styles.modalActions}>
          <ButtonComponent
            title="Cancelar"
            onPress={cancelEdit}
            variant="secondary"
            style={styles.modalButton}
          />
          <ButtonComponent
            title="Salvar"
            onPress={saveEdit}
            variant="success"
            style={styles.modalButton}
          />
        </View>
      </ModalComponent>

      {/* Modal de confirmação de exclusão */}
      <ModalComponent
        visible={deleteModalVisible}
        onRequestClose={cancelDelete}
      >
        <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
        <Text style={styles.deleteMessage}>
          Tem certeza que deseja excluir esta tarefa?
        </Text>
        <View style={styles.modalActions}>
          <ButtonComponent
            title="Cancelar"
            onPress={cancelDelete}
            variant="secondary"
            style={styles.modalButton}
          />
          <ButtonComponent
            title="Excluir"
            onPress={() => confirmDelete(taskToDelete)}
            variant="danger"
            style={styles.modalButton}
          />
        </View>
      </ModalComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
  },
  addButton: {
    minWidth: 100,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    gap: 10,
  },
  filterButton: {
    flex: 1,
    minWidth: 0,
  },
  listContainer: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkbox: {
    marginRight: 15,
  },
  checkboxInner: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#34C759',
    borderColor: '#34C759',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  taskActions: {
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    padding: 8,
  },
  editButtonText: {
    fontSize: 16,
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 50,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  modalInput: {
    marginBottom: 20,
    minHeight: 60,
  },
  deleteMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  modalButton: {
    flex: 1,
  },
});
