import { COMPILE, GET_ERRORS,LOADING} from './types';

const initialState = {
    ratings: [],
    rankings: [],
    avr: [],
    teams:[],
    process: "initial",
};


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case COMPILE:
            console.log("getting items");
            return {
                ratings: action.payload.ratings,
                avr: action.payload.avr,
                rankings: action.payload.rankings,
                teams: action.payload.teams,
                process: "initial",
            }
        case GET_ERRORS:
            console.log("errored");
            return {
                ...state,
                process: "error",
            }
        case LOADING:
            console.log("loading");
            return {
                ...state,
                process: "loading",
            }
        default:
            console.log("defaulted");
            return state;
    }
}

export default reducer;