import { useReducer } from 'react'
import type { State, Action } from '../types'
import { type FromLanguage, type Language } from '../types'
import { AUTO_LANGUAGE } from '../services/constants'

const initialState = {
    fromLanguage: AUTO_LANGUAGE as Language,
    toLanguage: 'en' as Language,
    fromText: '',
    result: '',
    loading: false,
}

function reducer(state: State, action: Action) {
    const { type } = action

    if (type === 'INTERCHANGE_LANGUAGES') {
        if (state.fromLanguage === 'auto') return state
        const loading = state.fromText !== ''
        return {
            ...state,
            loading,
            fromLanguage: state.toLanguage,
            toLanguage: state.fromLanguage,
            fromText: state.result,
            result: state.fromText,
        }
    }

    if (type === 'SET_FROM_LANGUAGE') {
        if (state.fromLanguage === action.payload) return state
        const loading = state.fromText !== ''
        return {
            ...state,
            fromLanguage: action.payload,
            result: '',
            loading,
        }
    }

    if (type === 'SET_TO_LANGUAGE') {
        if (state.toLanguage === action.payload) return state
        const loading = state.fromText !== ''
        return {
            ...state,
            toLanguage: action.payload,
            result: '',
            loading,
        }
    }

    if (type === 'SET_FROM_TEXT') {
        return {
            ...state,
            loading: true,
            fromText: action.payload,
            result: '',
        }
    }

    if (type === 'SET_RESULT') {
        return {
            ...state,
            loading: false,
            result: action.payload,
        }
    }

    return state
}

export function useStore() {
    const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] =
        useReducer(reducer, initialState)

    const interchangeLanguages = () => {
        dispatch({ type: 'INTERCHANGE_LANGUAGES' })
    }

    const setFromLanguage = (payload: FromLanguage) => {
        dispatch({ type: 'SET_FROM_LANGUAGE', payload })
    }

    const setToLanguage = (payload: Language) => {
        dispatch({ type: 'SET_TO_LANGUAGE', payload })
    }

    const setFromText = (payload: string) => {
        dispatch({ type: 'SET_FROM_TEXT', payload })
    }

    const setResult = (payload: string) => {
        dispatch({ type: 'SET_RESULT', payload })
    }

    return {
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading,
        interchangeLanguages,
        setFromLanguage,
        setToLanguage,
        setFromText,
        setResult,
    }
}
