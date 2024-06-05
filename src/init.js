import config from "./config";

export default () => {
    const state = {
        tasks: [
            /* {
                id: null,
                name: null,
                isDone: null,
            } */
        ],
        uiState: {
            modal: {
                taskName: null,
                isValid: null,
                error: null,
            },
            filter: config.defaultFilter,
        }
    };
    return state;
};
