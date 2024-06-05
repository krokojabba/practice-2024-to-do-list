import onChange from 'on-change';

const clearFeedback = (targetForm) => {
    const existFeedback = targetForm.querySelector('.invalid-feedback');
    if (existFeedback) existFeedback.remove();
};

const renderTaskList = (taskList, state) => {
    taskList.innerHTML = '';
    if (state.tasks.length === 0) {
        taskList.innerHTML = '<li class="list-group-item">To add new task press +</li>';
        return;
    }
    const filters = {
        all: () => true,
        done: (task) => task.isDone,
        undone: (task) => !task.isDone,
    };
    state.tasks
        .filter(filters[state.uiState.filter])
        .forEach((task) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between');
            li.dataset.taskId = task.id;
            li.dataset.event = 'done';
            /* li.textContent = task.name;
            if (task.isDone) li.classList.add('text-decoration-line-through');*/
            const div = document.createElement('div');
            div.dataset.taskId = task.id;
            div.dataset.event = 'done';
            div.textContent = task.name;
            div.classList.add('d-flex', 'align-self-center');
            if (task.isDone) div.classList.add('text-decoration-line-through');
            const button = document.createElement('button');
            button.classList.add('btn', 'btn-primary');
            button.dataset.taskId = task.id;
            button.dataset.event = 'delete';
            button.textContent = 'Delete';
            button.type = 'button';
            li.append(div, button);
            taskList.append(li);
        });
};

const renderModal = (modal, state) => {
    const taskNameInput = modal.querySelector('#taskName');
    const addBtn = modal.querySelector('#addBtn');
    addBtn.disabled = false;
    taskNameInput.classList.remove('is-valid', 'is-invalid');
    clearFeedback(modal);
    if (state.uiState.modal.taskName === null) {
        taskNameInput.value = '';
        return;
    }
    if (state.uiState.modal.isValid) taskNameInput.classList.add('is-valid');
    else {
        taskNameInput.classList.add('is-invalid');
        const invalidMessage = document.createElement('div');
        invalidMessage.textContent = state.uiState.modal.error;
        invalidMessage.classList.add('invalid-feedback');
        taskNameInput.after(invalidMessage);
        addBtn.disabled = true;
    }
};

const renderCounters = (counters, state) => {
    if (state.tasks.length === 0) {
        counters.classList.add('invisible');
        return;
    }
    counters.classList.remove('invisible');
    const doneCount = state.tasks.reduce((count, task) => task.isDone ? count += 1 : count, 0);
    counters.querySelector('#doneCounter').textContent = doneCount;
    counters.querySelector('#undoneCounter').textContent = state.tasks.length - doneCount;
};

const renderFilter = (filterForm, state) => {
    if (state.tasks.length === 0) {
        filterForm.elements.filter.disabled = true;
    } else filterForm.elements.filter.disabled = false;
};

export default (initState) => {
    const modal = document.querySelector('#modal');
    const taskList = document.querySelector('#taskList');
    const counters = document.querySelector('#counters');
    const filterForm = document.querySelector('#filterForm');

    const state = onChange(initState, (path, current, previous) => {
        console.log(`${path}: '${previous}' => '${JSON.stringify(current, null, 2)}'`);
        switch (path) {
            case 'tasks':
            case 'uiState.filter': {
                renderFilter(filterForm, state);
                renderTaskList(taskList, state);
                renderCounters(counters, state);
                break;
            }
            case 'uiState.modal': {
                renderModal(modal, state);
                break;
            }
            default:
                break;
        }
    }
    );
    return state;
};
