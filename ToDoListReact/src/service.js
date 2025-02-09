import axios from 'axios';

const apiUrl = "http://localhost:5216"
axios.defaults.baseURL = apiUrl;

axios.interceptors.response.use(
  response => {
    "successful"
    return response;
  },
  error => {
    // טיפול בשגיאה - לוג לשגיאות ב-response
    console.error('API Error:', error.response ? error.response.data : error.message);
    return Promise.reject(error); // מחזיר את השגיאה לפונקציה שקוראת
  }
);


export default {
  getTasks: async () => {
    try{
      const result = await axios.get(`${apiUrl}/items`)    
      return result.data;
    }catch (error) {
      console.error('Failed to fetch tasks:', error);
      throw error;
    }
  },

  addTask: async(name)=>{
    try {
      const result = await axios.post('/items', { name });
      console.log('Task added:', result.data);
      return result.data;
    } catch (error) {
      console.error('Failed to add task:', error);
      throw error;
    }
  },

  setCompleted: async(id, isComplete)=>{
    try {
      const result = await axios.put(`/items/${id}`, { isComplete });
      console.log('Task updated:', result.data);
      return result.data;
    } catch (error) {
      console.error('Failed to update task:', error);
      throw error;
    }
  },

  deleteTask:async(id)=>{
    try {
      const result = await axios.delete(`/items/${id}`);
      console.log('Task deleted:', result.data);
      return result.data;
    } catch (error) {
      console.error('Failed to delete task:', error);
      throw error;
    }
  }
}
