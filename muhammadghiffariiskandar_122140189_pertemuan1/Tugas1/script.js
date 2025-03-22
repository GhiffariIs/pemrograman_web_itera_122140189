let todos = JSON.parse(localStorage.getItem('todos')) || [];

        function saveTodos() {
            localStorage.setItem('todos', JSON.stringify(todos));
        }

        function renderTodos() {
            const todoList = document.getElementById('todoList');
            todoList.innerHTML = '';
            
            todos.forEach((todo, index) => {
                const todoDiv = document.createElement('div');
                todoDiv.className = 'todo-item';
                if (todo.done) todoDiv.classList.add('done');

                todoDiv.innerHTML = `
                    <input type="checkbox" ${todo.done ? 'checked' : ''} 
                        onchange="toggleTodo(${index})">
                    <span>${todo.text}</span>
                    <button class="delete-btn" onclick="deleteTodo(${index})">×</button>
                `;
                
                todoList.appendChild(todoDiv);
            });
        }

        function addTodo() {
            const input = document.getElementById('todoInput');
            const text = input.value.trim();
            
            if (text) {
                todos.push({ text, done: false });
                input.value = '';
                saveTodos();
                renderTodos();
            }
        }

        function toggleTodo(index) {
            todos[index].done = !todos[index].done;
            saveTodos();
            renderTodos();
        }

        function deleteTodo(index) {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        }

        // Initial render
        renderTodos();