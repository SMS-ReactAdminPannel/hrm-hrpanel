interface DepartmentsState {
    departments: string[];
    loading: boolean;
}

interface UpdateDepartmentsAction {
    type: 'UPDATE_DEPARTMENTS';
    payload: string[];
}

type DepartmentsAction = UpdateDepartmentsAction;

const initialState: DepartmentsState = {
    departments: [],
    loading: false,
};

const departmentsReducer = (state = initialState, action: DepartmentsAction): DepartmentsState => {
    switch (action.type) {
        case 'UPDATE_DEPARTMENTS':
            return {
                ...state,
                departments: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export const updateDepartments = (departments: string[]): UpdateDepartmentsAction => ({
    type: 'UPDATE_DEPARTMENTS',
    payload: departments,
});

export default departmentsReducer;
