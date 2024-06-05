import _ from "lodash";
export default (state, config) => {
    const modal = document.querySelector('#modal');
    const addForm = modal.querySelector('#addForm');
    const filterForm = document.querySelector('#filterForm');
    const addBtn = modal.querySelector('#addBtn');
    const taskList = document.querySelector('#taskList');

    addForm.addEventListener('input', () => {
        const taskName = addForm.elements.taskName.value;
        const isValid = taskName.length <= config.taskNameLengthMin;
        const error = isValid ? null : `Task name length must be less than or equal to ${config.taskNameLengthMin} characters`
        state.uiState.modal = { ...state.uiState.modal, taskName, isValid, error };
    });
    
    addBtn.addEventListener('click', () => {
        state.tasks.push({
            id: _.uniqueId(),
            name: state.uiState.modal.taskName,
            isDone: false,
        });
        state.uiState.modal = { ...state.uiState.modal, taskName: null };
    });

    modal.addEventListener('show.bs.modal', () => {
        state.uiState.modal = { ...state.uiState.modal, taskName: null };
    });

    taskList.addEventListener('click', (e) => {
        const { target: { dataset: { taskId, event } } } = e;
        switch (event) {
            case 'delete': {
                state.tasks = state.tasks.filter((task) => task.id !== taskId);
                break;
            }
            case 'done': {
                state.tasks = state.tasks.map((task) => {
                    if (task.id === taskId) task.isDone = !task.isDone;
                    return task;
                });
                break;
            }
            default: {
                break;
            }
        }
    });

    filterForm.addEventListener('input', () => {
        state.uiState.filter = filterForm.elements.filter.value;
    });
};