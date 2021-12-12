import React, { createContext, useContext, useReducer } from 'react';

const StoreContext = createContext();
const initialState = {
  isLoading: false,
  command: '',
  files: [],
  availableCiphers: [],
  availableDigests: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case 'SET_COMMAND':
      return {
        ...state,
        command: action.command,
      };

    case 'ADD_FILES':
      const fileExists = !!state.files.filter((item) =>
        action.items.some((x) => x.file.name === item.file.name)
      ).length;
      if (fileExists) {
        return {
          ...state,
          files: state.files.map(
            (item) => action.items.find((x) => x.file.name === item.file.name) || item
          ),
        };
      }

      return {
        ...state,
        files: [...state.files, ...action.items],
      };

    case 'DELETE_FILE':
      return {
        ...state,
        files: state.files.filter((item) => item !== action.item),
      };

    case 'SET_AVAILABLE_CIPHERS':
      return {
        ...state,
        availableCiphers: action.ciphers,
      };

    case 'SET_AVAILABLE_DIGEST':
      return {
        ...state,
        availableDigests: action.digests,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
